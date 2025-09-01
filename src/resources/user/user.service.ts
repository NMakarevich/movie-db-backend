import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import 'dotenv/config';
import * as process from 'node:process';
import { PrismaService } from '../../prisma/prisma.service';
import { DEFAULT_VALUES } from '../../constants';

const SALT = Number(process.env.BCRYPT_SALT) || DEFAULT_VALUES.bcryptSalt;

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const hash = await bcrypt.hash(createUserDto.password, SALT);
    const user = await this.findOneByLogin(createUserDto.login);
    if (user) throw new HttpException('User already exists', HttpStatus.CONFLICT);
    return this.prismaService.user.create({
      data: { ...createUserDto, password: hash },
      omit: { password: true },
    });
  }

  async findOne(id: string) {
    return this.prismaService.user.findUnique({
      where: { id },
      omit: { password: true },
      include: { favourites: true },
    });
  }

  async findOneByLogin(login: string) {
    return this.prismaService.user.findUnique({ where: { login } });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.prismaService.user.findUnique({ where: { id } });
    if (!user) throw new HttpException('User is not found', HttpStatus.NOT_FOUND);
    const isMatchPassword = await bcrypt.compare(updateUserDto.oldPassword, user.password);
    if (isMatchPassword) {
      const newHash = await bcrypt.hash(updateUserDto.newPassword, SALT);
      return this.prismaService.user.update({
        where: { id },
        data: { password: newHash },
        omit: { password: true },
      });
    } else throw new HttpException('Password are not match', HttpStatus.CONFLICT);
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    if (!user) throw new HttpException('User is not found', HttpStatus.NOT_FOUND);
    return this.prismaService.user.delete({ where: { id } });
  }
}
