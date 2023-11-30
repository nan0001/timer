import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TimersModule } from './timers/timers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: 'localhost',
      port: 27017,
      url: 'mongodb+srv://nastya:zhSqm5VFJU2gqDd8@timers.gk0r8gx.mongodb.net/timersDB?retryWrites=true&w=majority',
      database: 'timersDB',
      entities: [join(__dirname, '**/**.entity{.ts,.js}')],
    }),
    TimersModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
