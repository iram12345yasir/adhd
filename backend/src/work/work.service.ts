import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class WorkService {
  constructor(private prisma: PrismaService) {}
  tasks(userId: string) { return this.prisma.task.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } }); }
  createTask(userId: string, body: any) { return this.prisma.task.create({ data: { userId, title: String(body.title).trim(), priority: body.priority || 'medium', focusMinutes: Number(body.focusMinutes) || 25 } }); }
  habits(userId: string) { return this.prisma.habit.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } }); }
  createHabit(userId: string, body: any) { return this.prisma.habit.create({ data: { userId, name: String(body.name).trim(), target: Number(body.target) || 1 } }); }
}
