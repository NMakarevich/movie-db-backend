import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateListDto {
  @ApiProperty({ type: String, example: 'Watchlist' })
  @IsString()
  @IsNotEmpty()
  label: string;
}
