import { IsNotEmpty, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ForgotPasswordDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;
}
