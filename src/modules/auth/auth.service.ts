/* eslint-disable @typescript-eslint/no-unused-vars */
import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string) {
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      return null;
    }

    const match = await this.comparePassword(pass, user.password);
    if (!match) {
      return null;
    }

    const { password, ...result } = user['dataValues'];
    return result;
  }

  private async comparePassword(enteredPassword: any, dbPassword: any) {
    const match = await bcrypt.compare(enteredPassword, dbPassword);
    return match;
  }

  //   for login
  public async login(user: any) {
    const token = await this.generateToken(user);
    return { user, token };
  }

  //   for create
  public async create(user: any) {
    // hash the password
    const pass = await this.hashPassword(user.password);

    // create the user
    const newUser = await this.userService.create({ ...user, password: pass });

    const { password, ...result } = newUser['dataValues'];

    // generate token
    const token = await this.generateToken(result);

    // return user and the token
    return { user: result, token };
  }

  private async generateToken(user: any) {
    const token = await this.jwtService.signAsync(user);
    return token;
  }

  private async hashPassword(password: any) {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  }
}
