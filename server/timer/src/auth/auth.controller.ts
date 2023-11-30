import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './sign-in.dto';
import { Observable } from 'rxjs';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signUp(@Body() signInDto: SignInDto): Observable<{ access_token: string }> {
    return this.authService.signUp(signInDto.username, signInDto.password);
  }

  @Post('login')
  login(@Body() signInDto: SignInDto): Observable<{ access_token: string }> {
    return this.authService.login(signInDto.username, signInDto.password);
  }
}
