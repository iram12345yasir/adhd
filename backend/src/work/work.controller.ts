import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/jwt.guard';
import { WorkService } from './work.service';

@UseGuards(JwtGuard)
@Controller()
export class WorkController {
  constructor(private work: WorkService) {}
  @Get('tasks') tasks(@Req() req: any) { return this.work.tasks(req.user.sub); }
  @Post('tasks') createTask(@Req() req: any, @Body() body: any) { return this.work.createTask(req.user.sub, body); }
  @Get('habits') habits(@Req() req: any) { return this.work.habits(req.user.sub); }
  @Post('habits') createHabit(@Req() req: any, @Body() body: any) { return this.work.createHabit(req.user.sub, body); }
}
