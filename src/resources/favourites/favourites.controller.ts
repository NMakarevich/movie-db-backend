import { Body, Controller, Patch, Headers, HttpCode, HttpStatus, Get } from '@nestjs/common';
import { FavouritesService } from './favourites.service';
import { UpdateFavouritesDto } from './dto/update-favourites.dto';
import { JwtService } from '@nestjs/jwt';
import 'dotenv/config';
import * as process from 'node:process';
import { DEFAULT_VALUES } from '../../constants';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';

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
      type: 'object',
      properties: {
        id: {
          type: 'string',
          example: '02fad08d-6df2-4d7e-bcf1-1f252bc377b3',
        },
        moviesIds: {
          type: '[string]',
          example: ['movie-id'],
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
    return this.favouritesService.getOne(userId);
  }

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          example: 'movie-id',
        },
      },
    },
  })
  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          example: '02fad08d-6df2-4d7e-bcf1-1f252bc377b3',
        },
        moviesIds: {
          type: '[string]',
          example: ['movie-id'],
        },
        personIds: {
          type: '[string]',
          example: [],
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
  @Patch('/movie/add')
  @HttpCode(HttpStatus.OK)
  async addMovieToFavourites(
    @Body() updateFavouritesDto: UpdateFavouritesDto,
    @Headers('authorization') authorization: string,
  ) {
    const userId = await this.extractUserId(authorization);
    return this.favouritesService.addMovieToFavourites(userId, updateFavouritesDto);
  }

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          example: 'movie-id',
        },
      },
    },
  })
  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          example: '02fad08d-6df2-4d7e-bcf1-1f252bc377b3',
        },
        moviesIds: {
          type: '[string]',
          example: [],
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
  @Patch('/movie/delete')
  @HttpCode(HttpStatus.OK)
  async deleteMovieFromFavourites(
    @Body() updateFavouritesDto: UpdateFavouritesDto,
    @Headers('authorization') authorization: string,
  ) {
    const userId = await this.extractUserId(authorization);
    return this.favouritesService.deleteMovieFromFavourites(userId, updateFavouritesDto);
  }

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          example: 'movie-id',
        },
      },
    },
  })
  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          example: '02fad08d-6df2-4d7e-bcf1-1f252bc377b3',
        },
        moviesIds: {
          type: '[string]',
          example: ['movie-id'],
        },
        personIds: {
          type: '[string]',
          example: [],
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
  @Patch('/persons/add')
  @HttpCode(HttpStatus.OK)
  async addPersonToFavourites(
    @Body() updateFavouritesDto: UpdateFavouritesDto,
    @Headers('authorization') authorization: string,
  ) {
    const userId = await this.extractUserId(authorization);
    return this.favouritesService.addPersonToFavourites(userId, updateFavouritesDto);
  }

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          example: 'movie-id',
        },
      },
    },
  })
  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          example: '02fad08d-6df2-4d7e-bcf1-1f252bc377b3',
        },
        moviesIds: {
          type: '[string]',
          example: [],
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
  @Patch('/persons/delete')
  @HttpCode(HttpStatus.OK)
  async deletePersonFromFavourites(
    @Body() updateFavouritesDto: UpdateFavouritesDto,
    @Headers('authorization') authorization: string,
  ) {
    const userId = await this.extractUserId(authorization);
    return this.favouritesService.deletePersonFromFavourites(userId, updateFavouritesDto);
  }

  private async extractUserId(authorization: string) {
    const token = authorization.replace('Bearer ', '');
    const { userId } = await this.jwt.verify(token, { secret: JWT_SECRET });
    return userId;
  }
}
