import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RequiredId {
  @IsNotEmpty()
  @ApiProperty()
  id: string;
}
