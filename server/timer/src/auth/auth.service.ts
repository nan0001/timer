import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { Observable, from, map, switchMap } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { ObjectId } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  public login(
    username: string,
    password: string,
  ): Observable<{ access_token: string }> {
    const user$ = this.usersService.findUser(username, password);

    return user$.pipe(
      switchMap((result) => {
        if (!result) {
          throw new UnauthorizedException(
            "User with such credentials doesn't exist",
          );
        }

        const payload = { sub: result.id, username: result.username };

        return this.getJwtToken(payload);
      }),
    );
  }

  public signUp(
    username: string,
    password: string,
  ): Observable<{ access_token: string }> {
    const newUser$ = this.usersService.createUser(username, password);

    return newUser$.pipe(
      switchMap((user) => {
        const payload = { sub: user.id, username: user.username };

        return this.getJwtToken(payload);
      }),
    );
  }

  private getJwtToken(payload: {
    sub: ObjectId;
    username: string;
  }): Observable<{ access_token: string }> {
    return from(this.jwtService.signAsync(payload)).pipe(
      map((token) => {
        return {
          access_token: token,
        };
      }),
    );
  }
}
