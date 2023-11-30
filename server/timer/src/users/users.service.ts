import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { User } from './users.entity';
import { Observable, from, switchMap } from 'rxjs';
import { TimerType } from '../timers/timer-type.model';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  public findUser(
    username?: string,
    password?: string,
  ): Observable<User | null> {
    const whereQuery = password ? { username, password } : { username };

    return from(this.userRepo.findOne({ where: whereQuery }));
  }

  public createUser(
    username: string,
    password: string,
  ): Observable<User | null> {
    return this.findUser(username).pipe(
      switchMap((user) => {
        if (!user) {
          return from(
            this.userRepo.save({
              username,
              password,
              timers: { s: [], m: [], l: [] },
            }),
          );
        }

        throw new BadRequestException('User with such name already exists');
      }),
    );
  }

  public updateUser(
    username: string,
    timerType: TimerType,
    dateToAdd: number,
  ): Observable<UpdateResult> {
    return this.findUser(username).pipe(
      switchMap((user) => {
        if (user) {
          return from(
            this.userRepo.update(user.id, {
              timers: {
                ...user.timers,
                [timerType]: [...user.timers[timerType], dateToAdd],
              },
            }),
          );
        }

        throw new BadRequestException("Such user doesn't exist");
      }),
    );
  }
}
