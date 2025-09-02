import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ type: String, example: 'johnDoe' })
  @IsString()
  @IsNotEmpty()
  login: string;

  @ApiProperty({ type: String, example: 'John' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ type: String, example: 'Doe' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ type: String, example: 'john-doe-password' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
