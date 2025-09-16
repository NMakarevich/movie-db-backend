import { Injectable } from '@nestjs/common';
import { UpdateFavouritesDto } from './dto/update-favourites.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateListDto } from './dto/create-list.dto';

@Injectable()
export class FavouritesService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll(userId: string) {
    return this.prismaService.favourites.findMany({
      where: { userId },
    });
  }

  async getOne(id: string) {
    return this.prismaService.favourites.findUnique({
      where: { id },
    });
  }

  async createList(userId: string, createListDto: CreateListDto) {
    return this.prismaService.favourites.create({ data: { userId, label: createListDto.label } });
  }

  async addToFavourites(updateFavouritesDto: UpdateFavouritesDto) {
    const { id, contentId } = updateFavouritesDto;
    const list = await this.getOne(id);
    if (list.ids.includes(contentId)) return list;
    else
      return this.prismaService.favourites.update({
        where: { id },
        data: {
          ids: [...list.ids, contentId],
        },
      });
  }

  async deleteFromFavourites(updateFavouritesDto: UpdateFavouritesDto) {
    const { id, contentId } = updateFavouritesDto;
    const list = await this.getOne(id);
    return this.prismaService.favourites.update({
      where: { id },
      data: {
        ids: [...list.ids.filter((id) => id !== contentId)],
      },
    });
  }
}
