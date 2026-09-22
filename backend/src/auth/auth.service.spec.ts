import { ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { QueryFailedError, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';
import { MailService } from '../mail/mail.service';
import { RefreshTokenStore } from './refresh-token.store';
import { User } from '../users/users.entity';

describe('AuthService', () => {
  let service: AuthService;
  let usersRepository: {
    create: jest.Mock;
    save: jest.Mock;
    findOne: jest.Mock;
  };
  let jwtService: { signAsync: jest.Mock };
  let mailService: { sendWelcome: jest.Mock };
  let refreshTokenStore: {
    save: jest.Mock;
    resolve: jest.Mock;
    rotateOut: jest.Mock;
    revoke: jest.Mock;
    revokeAll: jest.Mock;
  };

  const user: User = {
    id: 'user-uuid-1',
    email: 'test@example.ru',
    name: 'Test User',
    passwordHash: '',
    resetCode: null,
    resetCodeExpiresAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    usersRepository = {
      create: jest.fn().mockImplementation((data) => data as User),
      save: jest.fn().mockImplementation((u) => Promise.resolve(u)),
      findOne: jest.fn(),
    };
    jwtService = {
      signAsync: jest.fn().mockResolvedValue('jwt-access-token'),
    };
    mailService = {
      sendWelcome: jest.fn().mockResolvedValue(undefined),
    };
    refreshTokenStore = {
      save: jest.fn().mockResolvedValue(undefined),
      resolve: jest.fn(),
      rotateOut: jest.fn().mockResolvedValue(undefined),
      revoke: jest.fn().mockResolvedValue(undefined),
      revokeAll: jest.fn().mockResolvedValue(0),
    };

    service = new AuthService(
      usersRepository as unknown as Repository<User>,
      jwtService as unknown as JwtService,
      mailService as unknown as MailService,
      refreshTokenStore as unknown as RefreshTokenStore,
    );

    // В login сравниваем с настоящим bcrypt-хэшем
    user.passwordHash = await bcrypt.hash('correct-password', 4);
  });

  describe('register', () => {
    it('создаёт пользователя, шлёт welcome-письмо и возвращает токены', async () => {
      const dto = {
        name: 'Test User',
        email: 'Test@Example.ru',
        password: '123456',
      };
      usersRepository.create.mockReturnValue({ ...user });

      const result = await service.register(dto);

      expect(usersRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          email: 'test@example.ru',
          name: 'Test User',
        }),
      );
      expect(usersRepository.save).toHaveBeenCalled();
      expect(mailService.sendWelcome).toHaveBeenCalledWith(
        'test@example.ru',
        'Test User',
      );
      expect(refreshTokenStore.save).toHaveBeenCalledWith(
        expect.any(String),
        user.id,
      );
      expect(result).toMatchObject({
        success: true,
        user: { email: user.email, name: user.name },
        accessToken: 'Bearer jwt-access-token',
      });
      expect(result.refreshToken).toMatch(/^[0-9a-f]{80}$/);
    });

    it('бросает 409 при дублировании email', async () => {
      const driverError = Object.assign(new Error('duplicate'), {
        code: '23505',
      });
      usersRepository.save.mockRejectedValue(
        new QueryFailedError('INSERT', [], driverError),
      );

      await expect(
        service.register({ name: 'N', email: 'e@e.ru', password: '123456' }),
      ).rejects.toBeInstanceOf(ConflictException);
    });
  });

  describe('login', () => {
    it('возвращает токены при верных кредах', async () => {
      usersRepository.findOne.mockResolvedValue(user);

      const result = await service.login({
        email: 'TEST@example.ru',
        password: 'correct-password',
      });

      expect(usersRepository.findOne).toHaveBeenCalledWith({
        where: { email: 'test@example.ru' },
      });
      expect(result.accessToken).toBe('Bearer jwt-access-token');
      expect(refreshTokenStore.save).toHaveBeenCalled();
    });

    it('401, если пользователь не найден', async () => {
      usersRepository.findOne.mockResolvedValue(null);

      await expect(
        service.login({ email: 'no@user.ru', password: '123456' }),
      ).rejects.toThrow('email or password are incorrect');
    });

    it('401 при неверном пароле (то же сообщение, что и при отсутствии юзера)', async () => {
      usersRepository.findOne.mockResolvedValue(user);

      await expect(
        service.login({ email: user.email, password: 'wrong-password' }),
      ).rejects.toThrow('email or password are incorrect');
    });
  });

  describe('refreshTokens', () => {
    it('401 на неизвестный токен', async () => {
      refreshTokenStore.resolve.mockResolvedValue(null);

      await expect(service.refreshTokens('unknown')).rejects.toThrow(
        'Token is invalid',
      );
      expect(refreshTokenStore.rotateOut).not.toHaveBeenCalled();
    });

    it('ротирует токен и выдаёт новую пару', async () => {
      refreshTokenStore.resolve.mockResolvedValue({
        userId: user.id,
        reused: false,
      });
      usersRepository.findOne.mockResolvedValue(user);

      const result = await service.refreshTokens('old-token');

      expect(refreshTokenStore.rotateOut).toHaveBeenCalledWith('old-token');
      expect(refreshTokenStore.save).toHaveBeenCalledWith(
        expect.any(String),
        user.id,
      );
      expect(result.success).toBe(true);
      expect(result.refreshToken).not.toBe('old-token');
    });

    it('при повторном использовании старого токена отзывает ВСЕ сессии (детект кражи)', async () => {
      refreshTokenStore.resolve.mockResolvedValue({
        userId: user.id,
        reused: true,
      });
      refreshTokenStore.revokeAll.mockResolvedValue(3);

      await expect(service.refreshTokens('stolen-token')).rejects.toThrow(
        'Token is invalid',
      );
      expect(refreshTokenStore.revokeAll).toHaveBeenCalledWith(user.id);
      expect(refreshTokenStore.rotateOut).not.toHaveBeenCalled();
    });

    it('401, если пользователь из токена не найден в БД', async () => {
      refreshTokenStore.resolve.mockResolvedValue({
        userId: 'ghost',
        reused: false,
      });
      usersRepository.findOne.mockResolvedValue(null);

      await expect(service.refreshTokens('valid-but-orphan')).rejects.toThrow(
        'Token is invalid',
      );
    });
  });

  describe('logout', () => {
    it('отзывает токен и всегда возвращает success', async () => {
      const result = await service.logout('some-token');

      expect(refreshTokenStore.revoke).toHaveBeenCalledWith('some-token');
      expect(result).toEqual({ success: true, message: 'Successful logout' });
    });
  });
});
