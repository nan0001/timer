import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { Observable, map } from 'rxjs';
import { Timers } from '../users/users.entity';
import { TimerType } from './timer-type.model';
import { UpdateResult } from 'typeorm';

@Injectable()
export class TimersService {
  constructor(private usersService: UsersService) {}

  public addTimer(
    username: string,
    timerType: TimerType,
    dateToAdd: number,
  ): Observable<UpdateResult> {
    return this.usersService.updateUser(username, timerType, dateToAdd);
  }

  public getAllTimers(username: string): Observable<Timers> {
    return this.usersService.findUser(username).pipe(
      map((user) => {
        if (user) {
          return user.timers;
        }

        throw new BadRequestException("User doesn't exist");
      }),
    );
  }

  public getTimersByType(
    username: string,
    timerType: TimerType,
  ): Observable<number[]> {
    return this.getAllTimers(username).pipe(map((timers) => timers[timerType]));
  }
}
