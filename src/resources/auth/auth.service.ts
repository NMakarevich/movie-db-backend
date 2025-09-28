import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(login: string, password: string): Promise<any> {
    const user = await this.userService.findOneByLogin(login);
    if (!user) throw new HttpException('Invalid login or/and password', HttpStatus.UNAUTHORIZED);
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (user && isValidPassword) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async signUp(createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  async login(body) {
    const user = await this.userService.findOneByLogin(body.login);
    const payload = { login: user.login, userId: user.id };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
