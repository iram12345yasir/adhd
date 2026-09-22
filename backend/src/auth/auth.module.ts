import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtGuard } from './jwt.guard';
import { PrismaService } from '../prisma.service';

@Module({ imports: [JwtModule.register({ secret: process.env.JWT_SECRET || 'local-development-secret-change-me', signOptions: { expiresIn: '7d' } })], controllers: [AuthController], providers: [AuthService, JwtGuard, PrismaService], exports: [JwtGuard] })
export class AuthModule {}
