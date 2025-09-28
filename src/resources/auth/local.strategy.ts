import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'login' });
  }

  async validate(login: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(login, password);
    if (!user) {
      throw new HttpException('Invalid login or/and password', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
}
