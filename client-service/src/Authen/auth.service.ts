import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findUserByUsername(username);
    console.log('user', user);
    const check = bcrypt.compare(password, user.password);
    if (check) {
      const { password, ...rest } = user;
      //console.log(rest)
      return rest;
    }
    return null;
  }

  async login(user: any) {
    const payload = { name: user.username, sub: user.id };
    //console.log('login', payload);
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}
