import {
  ConflictException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { User } from '../users/users.entity';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { MailService } from '../mail/mail.service';
import { RefreshTokenStore } from './refresh-token.store';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
    private readonly refreshTokenStore: RefreshTokenStore,
  ) {}

  async register(dto: RegisterDto) {
    const passwordHash = await bcrypt.hash(dto.password, 10);
    const user = this.usersRepository.create({
      name: dto.name,
      email: dto.email.toLocaleLowerCase(),
      passwordHash,
    });

    try {
      await this.usersRepository.save(user);
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        (error.driverError as { code?: string }).code === '23505'
      ) {
        throw new ConflictException('User already exists');
      }

      throw error;
    }

    this.mailService
      .sendWelcome(user.email, user.name)
      .catch((err: Error) =>
        this.logger.error(
          `Не удалось отправить welcome-письмо: ${err.message}`,
        ),
      );

    return this.buildAuthResponse(user);
  }

  async login(dto: LoginDto) {
    const user = await this.usersRepository.findOne({
      where: { email: dto.email.toLowerCase() },
    });
    if (!user || !(await bcrypt.compare(dto.password, user.passwordHash))) {
      throw new UnauthorizedException('email or password are incorrect');
    }
    return this.buildAuthResponse(user);
  }

  async refreshTokens(token: string) {
    const resolved = await this.refreshTokenStore.resolve(token);
    if (!resolved) {
      throw new UnauthorizedException('Token is invalid');
    }

    if (resolved.reused) {
      // Старый (уже ротированный) токен пришёл повторно — признак утечки.
      // Инвалидируем ВСЕ сессии пользователя.
      const revoked = await this.refreshTokenStore.revokeAll(resolved.userId);
      this.logger.warn(
        `Повторное использование refresh-токена (возможная кража): ` +
          `userId=${resolved.userId}, отозвано сессий: ${revoked}`,
      );
      throw new UnauthorizedException('Token is invalid');
    }

    const user = await this.usersRepository.findOne({
      where: { id: resolved.userId },
    });
    if (!user) {
      throw new UnauthorizedException('Token is invalid');
    }

    // Ротация: старый токен сгорает и помечается как использованный.
    await this.refreshTokenStore.rotateOut(token);
    return this.buildAuthResponse(user);
  }

  async logout(token: string) {
    await this.refreshTokenStore.revoke(token);
    return { success: true, message: 'Successful logout' };
  }

  private async buildAuthResponse(user: User) {
    const accessToken = await this.jwtService.signAsync({
      sub: user.id,
      email: user.email,
    });
    const refreshToken = randomBytes(40).toString('hex');
    await this.refreshTokenStore.save(refreshToken, user.id);

    return {
      success: true,
      user: { email: user.email, name: user.name },
      accessToken: `Bearer ${accessToken}`,
      refreshToken,
    };
  }
}
