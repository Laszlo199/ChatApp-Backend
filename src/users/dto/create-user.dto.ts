import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';
export class CreateUserDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}
