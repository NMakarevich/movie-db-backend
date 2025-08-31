import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateFavouritesDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}
