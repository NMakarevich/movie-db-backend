import {
  Body,
  Controller,
  Patch,
  Headers,
  HttpCode,
  HttpStatus,
  Get,
  Post,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { FavouritesService } from './favourites.service';
import { UpdateFavouritesDto } from './dto/update-favourites.dto';
import { JwtService } from '@nestjs/jwt';
import 'dotenv/config';
import * as process from 'node:process';
import { DEFAULT_VALUES } from '../../constants';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CreateListDto } from './dto/create-list.dto';

const JWT_SECRET = process.env.JWT_SECRET || DEFAULT_VALUES.jwtSecret;

@ApiBearerAuth()
@Controller('favourites')
export class FavouritesController {
  constructor(
    private readonly favouritesService: FavouritesService,
    private readonly jwt: JwtService,
  ) {}

  @ApiOkResponse({
    schema: {
      type: 'array',
      properties: {
        id: {
          type: 'string',
          example: '02fad08d-6df2-4d7e-bcf1-1f252bc377b3',
        },
        label: {
          type: 'string',
          example: 'Want to watch',
        },
        ids: {
          type: '[string]',
          example: ['movie-id'],
        },
        userId: {
          type: 'string',
          example: '484c3d98-2ade-470a-bb3b-fc26e1861104',
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
  async getFavourites(@Headers('authorization') authorization: string) {
    const userId = await this.extractUserId(authorization);
    return this.favouritesService.getAll(userId);
  }

  @ApiOkResponse({
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            example: '02fad08d-6df2-4d7e-bcf1-1f252bc377b3',
          },
          label: {
            type: 'string',
            example: 'Want to watch',
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
  @Get('/labels')
  @HttpCode(HttpStatus.OK)
  async getLabels(@Headers('authorization') authorization: string) {
    const userId = await this.extractUserId(authorization);
    return this.favouritesService.getLabels(userId);
  }

  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          example: '02fad08d-6df2-4d7e-bcf1-1f252bc377b3',
        },
        label: {
          type: 'string',
          example: 'Want to watch',
        },
        ids: {
          type: '[string]',
          example: ['movie-id'],
        },
        userId: {
          type: 'string',
          example: '484c3d98-2ade-470a-bb3b-fc26e1861104',
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
  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async getFavourite(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favouritesService.getOne(id);
  }

  @ApiBody({ type: CreateListDto })
  @ApiCreatedResponse({
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          example: '02fad08d-6df2-4d7e-bcf1-1f252bc377b3',
        },
        label: {
          type: 'string',
          example: 'Want to watch',
        },
        ids: {
          type: '[string]',
          example: [],
        },
        userId: {
          type: 'string',
          example: '484c3d98-2ade-470a-bb3b-fc26e1861104',
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
  @Post('/new')
  @HttpCode(HttpStatus.CREATED)
  async createList(
    @Headers('authorization') authorization: string,
    @Body() createListDto: CreateListDto,
  ) {
    const userId = await this.extractUserId(authorization);
    return this.favouritesService.createList(userId, createListDto);
  }

  @ApiBody({ type: UpdateFavouritesDto })
  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          example: '02fad08d-6df2-4d7e-bcf1-1f252bc377b3',
        },
        label: {
          type: 'string',
          example: 'Want to watch',
        },
        ids: {
          type: '[string]',
          example: ['movie-id'],
        },
        userId: {
          type: 'string',
          example: '484c3d98-2ade-470a-bb3b-fc26e1861104',
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
  @Patch('/add')
  @HttpCode(HttpStatus.OK)
  async addMovieToFavourites(@Body() updateFavouritesDto: UpdateFavouritesDto) {
    return this.favouritesService.addToFavourites(updateFavouritesDto);
  }

  @ApiBody({ type: UpdateFavouritesDto })
  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          example: '02fad08d-6df2-4d7e-bcf1-1f252bc377b3',
        },
        label: {
          type: 'string',
          example: 'Want to watch',
        },
        ids: {
          type: '[string]',
          example: [],
        },
        userId: {
          type: 'string',
          example: '484c3d98-2ade-470a-bb3b-fc26e1861104',
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
  @Patch('/delete')
  @HttpCode(HttpStatus.OK)
  async deleteFromFavourites(@Body() updateFavouritesDto: UpdateFavouritesDto) {
    return this.favouritesService.deleteFromFavourites(updateFavouritesDto);
  }

  private async extractUserId(authorization: string) {
    const token = authorization.replace('Bearer ', '');
    const { userId } = await this.jwt.verify(token, { secret: JWT_SECRET });
    return userId;
  }
}
