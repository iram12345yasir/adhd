import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { IsEmail, IsIn, IsString, MinLength } from 'class-validator';
import { AuthService } from './auth.service';
import { JwtGuard } from './jwt.guard';

class RegisterDto { @IsString() name!: string; @IsEmail() email!: string; @MinLength(8) password!: string; @IsIn(['PATIENT','CLINICIAN','ADMIN']) role = 'PATIENT'; }
class LoginDto { @IsEmail() email!: string; @IsString() password!: string; }

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}
  @Post('register') register(@Body() body: RegisterDto) { return this.auth.register(body.name, body.email, body.password, body.role); }
  @Post('login') login(@Body() body: LoginDto) { return this.auth.login(body.email, body.password); }
  @UseGuards(JwtGuard) @Get('me') me(@Req() req: any) { return this.auth.me(req.user.sub); }
}
