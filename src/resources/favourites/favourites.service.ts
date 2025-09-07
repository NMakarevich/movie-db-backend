import { Injectable } from '@nestjs/common';
import { UpdateFavouritesDto } from './dto/update-favourites.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class FavouritesService {
  constructor(private readonly prismaService: PrismaService) {}

  async getOne(id: string) {
    return this.prismaService.favourites.upsert({
      where: { id },
      update: {},
      create: {
        id: id,
        movieIds: [],
      },
    });
  }

  async addMovieToFavourites(userId: string, updateFavouritesDto: UpdateFavouritesDto) {
    const favourites = await this.getOne(userId);
    const idInFavourites = favourites.movieIds.find((id) => id === updateFavouritesDto.id);
    if (idInFavourites) return favourites;
    return this.prismaService.favourites.update({
      where: { id: userId },
      data: { movieIds: [...favourites.movieIds, updateFavouritesDto.id] },
    });
  }

  async deleteMovieFromFavourites(userId: string, updateFavouritesDto: UpdateFavouritesDto) {
    const favourites = await this.getOne(userId);
    return this.prismaService.favourites.update({
      where: { id: userId },
      data: {
        movieIds: [...favourites.movieIds.filter((id) => id !== updateFavouritesDto.id)],
      },
    });
  }

  async addPersonToFavourites(userId: string, updateFavouritesDto: UpdateFavouritesDto) {
    const favourites = await this.getOne(userId);
    const idInFavourites = favourites.personIds.find((id) => id === updateFavouritesDto.id);
    if (idInFavourites) return favourites;
    return this.prismaService.favourites.update({
      where: { id: userId },
      data: { personIds: [...favourites.personIds, updateFavouritesDto.id] },
    });
  }

  async deletePersonFromFavourites(userId: string, updateFavouritesDto: UpdateFavouritesDto) {
    const favourites = await this.getOne(userId);
    return this.prismaService.favourites.update({
      where: { id: userId },
      data: {
        personIds: [...favourites.personIds.filter((id) => id !== updateFavouritesDto.id)],
      },
    });
  }
}
