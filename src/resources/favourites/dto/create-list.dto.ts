import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateListDto {
  @ApiProperty({ type: String, example: 'Want to watch' })
  @IsString()
  @IsNotEmpty()
  label: string;
}
