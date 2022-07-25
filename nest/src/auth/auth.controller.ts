import { Body, Controller, Get, Post, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { ConfirmAccountDto } from './dto/confirm-account.dto';
import { SignInDto } from './dto/signin.dto';
import { IReadableUser } from '../user/interfaces/readable-user.interface';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { IUser } from '../user/interfaces/user.interface';
import { ChangePasswordDto } from './dto/change-password.dto';
import { GetUser } from './components/decorators/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signUp')
  async signUp(@Body(new ValidationPipe()) createUserDto: CreateUserDto): Promise<boolean> {
    return this.authService.signUp(createUserDto);
  }

  @Get('/confirm')
  async confirm(@Query(new ValidationPipe()) query: ConfirmAccountDto): Promise<boolean> {
    await this.authService.confirm(query.token);
    return true;
  }

  @Post('/signIn')
  async signIn(@Body(new ValidationPipe()) signInDto: SignInDto): Promise<IReadableUser> {
    return await this.authService.signIn(signInDto);
  }

  @Post('/forgotPassword')
  async forgotPassword(@Body(new ValidationPipe()) forgotPasswordDto: ForgotPasswordDto): Promise<boolean> {
    return this.authService.forgotPassword(forgotPasswordDto);
  }

  @Post('/changePassword')
  @UseGuards(AuthGuard())
  @ApiBearerAuth('JWT-auth')
  async changePassword(@GetUser() user: IUser, @Body(new ValidationPipe()) changePasswordDto: ChangePasswordDto): Promise<boolean> {
    return this.authService.changePassword(user._id, changePasswordDto);
  }
}
