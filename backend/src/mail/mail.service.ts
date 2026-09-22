import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import nodemailer, { Transporter } from 'nodemailer';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private readonly transporter: Transporter | null;
  private readonly from: string;

  constructor(config: ConfigService) {
    const enabled = config.get<string>('MAIL_ENABLED') === 'true';
    this.from = config.get<string>('MAIL_FROM') ?? 'Stellar Burgers';
    const port = Number(config.get<string>('MAIL_PORT'));

    if (enabled) {
      this.transporter = nodemailer.createTransport({
        host: config.get<string>('MAIL_HOST'),
        port: Number(config.get<string>('MAIL_PORT')),
        secure: port === 465,
        auth: {
          user: config.get<string>('MAIL_USER'),
          pass: config.get<string>('MAIL_PASSWORD'),
        },
      });
    } else {
      this.transporter = null;
      this.logger.warn('MAIL_ENABLED=false - логирование писем');
    }
  }

  private async send(to: string, subject: string, html: string) {
    if (!this.transporter) {
      this.logger.log(`[mail stub] to=${to} subject="${subject}"`);
      return;
    }
    await this.transporter.sendMail({ from: this.from, to, subject, html });
    this.logger.log(`Письмо отправлено: ${to} (${subject})`);
  }

  async sendWelcome(to: string, name: string) {
    await this.send(
      to,
      'Добро пожаловать в Stellar Burgers!',
      `<h1>Привет, ${name}!</h1><p>Вы успешно зарегистрировались в Stellar Burgers. Приятного аппетита! 🍔</p>`,
    );
  }

  async sendResetCode(to: string, code: string) {
    await this.send(
      to,
      'Сброс пароля от аккаунта Stellar Burgers',
      `<p>Ваш код для сброса пароля: <b>${code}</b></p><p>Код действует 15 минут. Если вы не запрашивали сброс — проигнорируйте это письмо.</p>`,
    );
  }
}
