import {
  Body,
  Controller,
  Request,
  Post,
  UseInterceptors,
  ClassSerializerInterceptor,
  HttpCode,
  HttpStatus,
  UseGuards,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { Public } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';
import {
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: CreateUserDto })
  @ApiCreatedResponse({
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          example: '02fad08d-6df2-4d7e-bcf1-1f252bc377b3',
        },
        login: {
          type: 'string',
          example: 'johnDoe',
        },
        firstName: {
          type: 'string',
          example: 'John',
        },
        lastName: {
          type: 'string',
          example: 'Doe',
        },
      },
    },
  })
  @ApiConflictResponse({
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 409 },
        message: { type: 'string', example: 'User already exists' },
      },
    },
  })
  @Public()
  @Post('/signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        login: {
          type: 'string',
          example: 'johnDoe',
        },
        password: {
          type: 'string',
          example: 'john-doe-password',
        },
      },
    },
  })
  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: { token: { type: 'string', example: 'jwt-token' } },
    },
  })
  @ApiUnauthorizedResponse({
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 401 },
        message: { type: 'string', example: 'Invalid login or/and password' },
      },
    },
  })
  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(@Request() req) {
    return this.authService.login(req.body);
  }

  @Get('/check')
  @HttpCode(HttpStatus.NO_CONTENT)
  checkToken() {}
}
