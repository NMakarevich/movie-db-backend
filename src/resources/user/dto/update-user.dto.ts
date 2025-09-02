import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ type: String, example: 'john-doe-password' })
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @ApiProperty({ type: String, example: 'new-password' })
  @IsString()
  @IsNotEmpty()
  newPassword: string;
}
