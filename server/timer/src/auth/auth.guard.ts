import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './auth.constants';
import { Request } from 'express';
import { User } from '../users/users.entity';
import { UserRequestInterface } from '../users/user-request.model';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: UserRequestInterface = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Please, specify user token in header');
    }

    try {
      const payload = await this.jwtService.verifyAsync<User>(token, {
        secret: jwtConstants.secret,
      });

      request.user = payload;
    } catch {
      throw new UnauthorizedException('Bad token');
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];

    return type === 'Bearer' ? token : undefined;
  }
}
