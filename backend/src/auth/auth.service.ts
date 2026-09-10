import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { User } from '../users/users.entity';
import { LoginDto, RegisterDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const passwordHash = await bcrypt.hash(dto.password, 10);
    const user = this.usersRepository.create({
      name: dto.name,
      email: dto.email.toLocaleLowerCase(),
      passwordHash,
    });
    await this.usersRepository.save(user);
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
    const user = await this.findByRefreshToken(token);
    if (!user) {
      throw new UnauthorizedException('Token is invalid');
    }
    return this.buildAuthResponse(user);
  }

  async logout(token: string) {
    const user = await this.findByRefreshToken(token);
    if (user) {
      user.refreshTokenHash = null;
      await this.usersRepository.save(user);
    }
    return { success: true, message: 'Successful logout' };
  }

  private async findByRefreshToken(token: string): Promise<User | null> {
    const users = await this.usersRepository
      .createQueryBuilder('user')
      .where('user.refreshTokenHash IS NOT NULL')
      .getMany();
    for (const user of users) {
      if (await bcrypt.compare(token, user.refreshTokenHash!)) {
        return user;
      }
    }
    return null;
  }

  private async buildAuthResponse(user: User) {
    const accessToken = await this.jwtService.signAsync({
      sub: user.id,
      email: user.email,
    });
    const refreshToken = randomBytes(40).toString('hex');

    user.refreshTokenHash = await bcrypt.hash(refreshToken, 10);
    await this.usersRepository.save(user);

    return {
      success: true,
      user: { email: user.email, name: user.name },
      accessToken: `Bearer ${accessToken}`,
      refreshToken,
    };
  }
}
