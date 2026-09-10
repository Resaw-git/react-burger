import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenExpiredError } from '@nestjs/jwt';
import { Request } from 'express';

export interface IRequestWithUser extends Request {
  user: { sub: string; email: string };
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<IRequestWithUser>();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token is invalid');
    }

    const token = authHeader.slice('Bearer '.length);

    try {
      request.user = await this.jwtService.verifyAsync<{
        sub: string;
        email: string;
      }>(token);
      return true;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new UnauthorizedException('jwt expired');
      }

      throw new UnauthorizedException('Token is invalid');
    }
  }
}
