import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { UserRoles } from './decorators/role.enum';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    console.log(user);
    if (!user || !user.status) {
      throw new UnauthorizedException();
    }
    const isMatch = await bcrypt.compare(pass, user?.password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }

    const payload = { name: user.name, id: user.id, roles: [user.role] };
    return {
      access_token: await this.jwtService.signAsync(payload),
      user: {
        id: user.id,
        name: user.name,
        phone: user.phone,
        email: user.email,
        role: user.role,
      },
    };
  }

  async createUser() {
    const user = await this.usersService.create({
      name: 'admin',
      phone: '112233',
      email: 'test@test.com',
      role: UserRoles.Admin,
      password: 'Password@123',
    });
    return user;
  }
}
