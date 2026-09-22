import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}
  private publicUser(user: any) { return { id: user.id, name: user.name, email: user.email, role: user.role }; }
  async register(name: string, email: string, password: string, role = 'PATIENT') {
    const existing = await this.prisma.user.findUnique({ where: { email: email.toLowerCase() } });
    if (existing) throw new UnauthorizedException('User already exists');
    const user = await this.prisma.user.create({ data: { name, email: email.toLowerCase(), password: await bcrypt.hash(password, 12), role: role as any } });
    return { token: this.jwt.sign({ sub: user.id, role: user.role }), user: this.publicUser(user) };
  }
  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email: email.toLowerCase() } });
    if (!user || !user.isActive || !(await bcrypt.compare(password, user.password))) throw new UnauthorizedException('Invalid credentials');
    return { token: this.jwt.sign({ sub: user.id, role: user.role }), user: this.publicUser(user) };
  }
  async me(id: string) { const user = await this.prisma.user.findUnique({ where: { id } }); if (!user) throw new UnauthorizedException(); return { user: this.publicUser(user) }; }
}
