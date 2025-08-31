import { Module } from '@nestjs/common';
import { FavouritesService } from './favourites.service';
import { FavouritesController } from './favourites.controller';
import { JwtService } from '@nestjs/jwt';
import { PrismaModule } from '../../prisma/prisma.module';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [FavouritesController],
  imports: [PrismaModule],
  providers: [FavouritesService, JwtService, PrismaService],
})
export class FavouritesModule {}
