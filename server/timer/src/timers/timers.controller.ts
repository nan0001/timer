import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Req,
  BadRequestException,
} from '@nestjs/common';
import { TimersService } from './timers.service';
import { AuthGuard } from '../auth/auth.guard';
import { Timers, User } from '../users/users.entity';
import { UserRequestInterface } from '../users/user-request.model';
import { TimerType } from './timer-type.model';
import { Observable } from 'rxjs';
import { UpdateResult } from 'typeorm';

@Controller('timers')
export class TimersController {
  constructor(private timersService: TimersService) {}

  @UseGuards(AuthGuard)
  @Get()
  getAll(@Req() req: UserRequestInterface): Observable<Timers> {
    const user = req.user as User;

    return this.timersService.getAllTimers(user.username);
  }

  @UseGuards(AuthGuard)
  @Get(':timerType')
  getByType(
    @Param('timerType') timerType: string,
    @Req() req: UserRequestInterface,
  ): Observable<number[]> {
    if (timerType in TimerType) {
      const user = req.user as User;

      return this.timersService.getTimersByType(
        user.username,
        timerType as TimerType,
      );
    }

    throw new BadRequestException("Such timer type doesn't exist");
  }

  @UseGuards(AuthGuard)
  @Post(':timerType')
  addTimer(
    @Body('date') date: number,
    @Param('timerType') timerType: string,
    @Req() req: UserRequestInterface,
  ): Observable<UpdateResult> {
    if (timerType in TimerType) {
      const user = req.user as User;

      return this.timersService.addTimer(
        user.username,
        timerType as TimerType,
        date,
      );
    }

    throw new BadRequestException("Such timer type doesn't exist");
  }
}
