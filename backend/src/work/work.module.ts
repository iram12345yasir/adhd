import { Module } from '@nestjs/common';
import { WorkController } from './work.controller';
import { WorkService } from './work.service';
import { PrismaService } from '../prisma.service';
import { JwtGuard } from '../auth/jwt.guard';
import { JwtModule } from '@nestjs/jwt';

@Module({ imports: [JwtModule.register({ secret: process.env.JWT_SECRET || 'local-development-secret-change-me' })], controllers: [WorkController], providers: [WorkService, PrismaService, JwtGuard] })
export class WorkModule {}
