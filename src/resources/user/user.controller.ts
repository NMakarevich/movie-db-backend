import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  ClassSerializerInterceptor,
  UseInterceptors,
  HttpCode,
  HttpStatus,
  Headers,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as process from 'node:process';
import { DEFAULT_VALUES } from '../../constants';
import 'dotenv/config';

const JWT_SECRET = process.env.JWT_SECRET || DEFAULT_VALUES.jwtSecret;

@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwt: JwtService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findOne(@Headers('authorization') authorization: string) {
    const userId = await this.extractUserId(authorization);
    return this.userService.findOne(userId);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id', new ParseUUIDPipe()) id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.userService.remove(id);
  }

  private async extractUserId(authorization: string) {
    const token = authorization.replace('Bearer ', '');
    const { userId } = await this.jwt.verify(token, { secret: JWT_SECRET });
    return userId;
  }
}
