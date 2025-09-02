import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateFavouritesDto {
  @ApiProperty({ type: String, example: 'movie-id' })
  @IsString()
  @IsNotEmpty()
  id: string;
}
