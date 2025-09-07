import {
  Controller,
  Get,
  Body,
  Patch,
  Delete,
  ClassSerializerInterceptor,
  UseInterceptors,
  HttpCode,
  HttpStatus,
  Headers,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { JwtService } from '@nestjs/jwt';
import * as process from 'node:process';
import { DEFAULT_VALUES } from '../../constants';
import 'dotenv/config';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Public } from '../auth/jwt-auth.guard';

const JWT_SECRET = process.env.JWT_SECRET || DEFAULT_VALUES.jwtSecret;

@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwt: JwtService,
  ) {}

  @ApiOkResponse({
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
        favourites: {
          type: 'array',
          items: {
            type: 'string',
            example: [],
          },
        },
      },
    },
  })
  @ApiUnauthorizedResponse({
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 401 },
        message: { type: 'string', example: 'Unauthorized' },
      },
    },
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findOne(@Headers('authorization') authorization: string) {
    const userId = await this.extractUserId(authorization);
    return this.userService.findOne(userId);
  }

  @Public()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        login: {
          type: 'string',
          example: 'johnDoe',
        },
      },
    },
  })
  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        isTaken: { type: 'boolean', example: false },
      },
    },
  })
  @Post('/check')
  async isTakenLogin(@Body() { login }: { login: string }) {
    const user = await this.userService.findOneByLogin(login);
    return { isTaken: !!user };
  }

  @ApiOkResponse({
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
        favourites: {
          type: 'array',
          items: {
            type: 'string',
            example: [],
          },
        },
      },
    },
  })
  @ApiNotFoundResponse({
    schema: {
      type: 'object',
      properties: {
        statusCode: {
          type: 'number',
          example: 404,
        },
        message: {
          type: 'string',
          example: 'User is not found',
        },
      },
    },
  })
  @ApiUnauthorizedResponse({
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 401 },
        message: { type: 'string', example: 'Unauthorized' },
      },
    },
  })
  @ApiConflictResponse({
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 409 },
        message: { type: 'string', example: 'Password are not match' },
      },
    },
  })
  @Patch()
  @HttpCode(HttpStatus.OK)
  async updatePassword(
    @Headers('authorization') authorization: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    const userId = await this.extractUserId(authorization);
    return this.userService.updatePassword(userId, updatePasswordDto);
  }

  @ApiNoContentResponse()
  @ApiNotFoundResponse({
    schema: {
      type: 'object',
      properties: {
        statusCode: {
          type: 'number',
          example: 404,
        },
        message: {
          type: 'string',
          example: 'User is not found',
        },
      },
    },
  })
  @ApiUnauthorizedResponse({
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 401 },
        message: { type: 'string', example: 'Unauthorized' },
      },
    },
  })
  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Headers('authorization') authorization: string) {
    const userId = await this.extractUserId(authorization);
    return this.userService.remove(userId);
  }

  private async extractUserId(authorization: string) {
    const token = authorization.replace('Bearer ', '');
    const { userId } = await this.jwt.verify(token, { secret: JWT_SECRET });
    return userId;
  }
}
