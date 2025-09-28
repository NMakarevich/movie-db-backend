import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateFavouritesDto {
  @ApiProperty({ type: String, example: 'movie-id' })
  @IsString()
  @IsNotEmpty()
  contentId: string;

  @ApiProperty({ type: String, example: '02fad08d-6df2-4d7e-bcf1-1f252bc377b3' })
  @IsString()
  @IsNotEmpty()
  id: string;
}
