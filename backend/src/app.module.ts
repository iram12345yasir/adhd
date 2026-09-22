import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';
import { HealthController } from './health.controller';
import { WorkModule } from './work/work.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    WorkModule,
  ],
  controllers: [HealthController],
  providers: [PrismaService],
})
export class AppModule {}
