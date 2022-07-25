import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { IUser } from './interfaces/user.interface';
import { ApiTags } from '@nestjs/swagger';
import { RequiredId } from '../common/dto/required-id.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  async getUser(@Query(ValidationPipe) query: RequiredId): Promise<IUser> {
    return this.userService.find(query.id);
  }
}
