import { Module } from '@nestjs/common';
import { TimersController } from './timers.controller';
import { TimersService } from './timers.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [TimersController],
  providers: [TimersService],
})
export class TimersModule {}
