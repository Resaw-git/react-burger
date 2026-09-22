import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { randomInt } from 'crypto';
import { User } from '../users/users.entity';
import { MailService } from '../mail/mail.service';

const RESET_CODE_TTL_MS = 15 * 60 * 1000;

@Injectable()
export class PasswordResetService {
  private readonly logger = new Logger(PasswordResetService.name);

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly mailService: MailService,
  ) {}

  async requestRest(email: string) {
    const user = await this.usersRepository.findOne({
      where: { email: email.toLocaleLowerCase() },
    });
    if (!user) {
      throw new NotFoundException('User with this email not found');
    }

    const code = randomInt(100000, 1000000).toString();
    user.resetCode = code;
    user.resetCodeExpiresAt = new Date(Date.now() + RESET_CODE_TTL_MS);
    await this.usersRepository.save(user);

    try {
      await this.mailService.sendResetCode(user.email, code);
    } catch (err) {
      this.logger.error(
        `Не удалось отправить код сброса на ${user.email}`,
        err,
      );
    }

    return { success: true, message: 'Reset email sent' };
  }

  async confirmReset(password: string, token: string) {
    const user = await this.usersRepository.findOne({
      where: { resetCode: token },
    });

    const isExpired =
      !user?.resetCodeExpiresAt || user.resetCodeExpiresAt < new Date();

    if (!user || isExpired) {
      throw new BadRequestException('Incorrect reset token');
    }

    user.passwordHash = await bcrypt.hash(password, 10);
    user.resetCode = null;
    user.resetCodeExpiresAt = null;
    await this.usersRepository.save(user);

    return { success: true, message: 'Password successfully reset' };
  }
}
