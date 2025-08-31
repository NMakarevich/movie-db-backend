import { Body, Controller, Patch, Headers, HttpCode, HttpStatus, Get } from '@nestjs/common';
import { FavouritesService } from './favourites.service';
import { UpdateFavouritesDto } from './dto/update-favourites.dto';
import { JwtService } from '@nestjs/jwt';
import 'dotenv/config';
import * as process from 'node:process';
import { DEFAULT_VALUES } from '../../constants';

const JWT_SECRET = process.env.JWT_SECRET || DEFAULT_VALUES.jwtSecret;

@Controller('favourites')
export class FavouritesController {
  constructor(
    private readonly favouritesService: FavouritesService,
    private readonly jwt: JwtService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getFavourites(@Headers('authorization') authorization: string) {
    const userId = await this.extractUserId(authorization);
    return this.favouritesService.getOne(userId);
  }

  @Patch('/add')
  @HttpCode(HttpStatus.OK)
  async addToFavourites(
    @Body() updateFavouritesDto: UpdateFavouritesDto,
    @Headers('authorization') authorization: string,
  ) {
    const userId = await this.extractUserId(authorization);
    return this.favouritesService.addToFavourites(userId, updateFavouritesDto);
  }

  @Patch('/delete')
  @HttpCode(HttpStatus.OK)
  async deleteFromFavourites(
    @Body() updateFavouritesDto: UpdateFavouritesDto,
    @Headers('authorization') authorization: string,
  ) {
    const userId = await this.extractUserId(authorization);
    return this.favouritesService.deleteFromFavourites(userId, updateFavouritesDto);
  }

  private async extractUserId(authorization: string) {
    const token = authorization.replace('Bearer ', '');
    const { userId } = await this.jwt.verify(token, { secret: JWT_SECRET });
    return userId;
  }
}
