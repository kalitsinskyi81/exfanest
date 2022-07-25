import { BadRequestException, Injectable, MethodNotAllowedException, UnauthorizedException } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import moment from 'moment';
import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';

import { UserService } from '../user/user.service';
import { TokenService } from '../token/token.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { CreateTokenDto } from '../token/dto/create-token.dto';
import { roleEnum } from '../user/enums/role.enum';
import { statusEnum } from '../user/enums/status.enum';
import { IUser } from '../user/interfaces/user.interface';
import { MailService } from '../mail/mail.service';
import { ITokenPayload } from './interfaces/token-payload.interface';
import { SignInDto } from './dto/signin.dto';
import { IReadableUser } from '../user/interfaces/readable-user.interface';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';

const userSensitiveFieldsEnum = ['__v', 'password', 'searchField'];

@Injectable()
export class AuthService {
  private readonly clientAppUrl: string;

  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
    private readonly configService: ConfigService,
    private readonly mailService: MailService
  ) {
    this.clientAppUrl = this.configService.get<string>('FE_APP_URL');
  }

  async signUp(createUserDto: CreateUserDto): Promise<boolean> {
    const newUser = await this.userService.create(createUserDto, [roleEnum.user]);
    await this.sendConfirmation(newUser);

    return true;
  }

  async signIn({ email, password }: SignInDto): Promise<IReadableUser> {
    const user = await this.userService.findByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      // if (user.status !== statusEnum.active) {
      //   throw new MethodNotAllowedException();
      // }

      const token = await this.signUser(user);

      // const tokenPayload: ITokenPayload = {
      //   _id: user.id,
      //   status: user.status,
      //   roles: user.roles,
      // };
      // const token = await this.generateToken(tokenPayload);
      // const expireAt = moment().add(1, 'day').toISOString();
      //
      // await this.saveToken({
      //   token,
      //   expireAt,
      //   uId: user._id,
      // });

      const readableUser = user.toObject() as IReadableUser;
      readableUser.accessToken = token;

      return _.omit(readableUser, userSensitiveFieldsEnum) as IReadableUser;
    }

    throw new BadRequestException('Invalid Credentials');
  }

  async changePassword(userId: string, changePasswordDto: ChangePasswordDto): Promise<boolean> {
    const password = await this.userService.hashPassword(changePasswordDto.password);

    await this.userService.update(userId, { password });
    await this.tokenService.deleteAll(userId);

    return true;
  }

  private async generateToken(data: ITokenPayload, options?: JwtSignOptions): Promise<string> {
    return this.jwtService.sign(data, options);
  }

  private async verifyToken(token): Promise<any> {
    try {
      const data = this.jwtService.verify(token) as ITokenPayload;
      const tokenExists = await this.tokenService.exists(data._id, token);

      if (tokenExists) {
        return data;
      }

      throw new UnauthorizedException();
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  private async saveToken(createTokenDto: CreateTokenDto) {
    return await this.tokenService.create(createTokenDto);
  }

  async sendConfirmation(user: IUser) {
    const token = await this.signUser(user);

    await this.confirm(token);

    // const confirmLink = `${this.clientAppUrl}/auth/confirm?token=${token}`;
    // const confirmLink = `localhost:${process.env.PORT}/auth/confirm?token=${token}`;
    // await this.mailService.send({
    //   from: this.configService.get<string>('JS_CODE_MAIL'),
    //   to: user.email,
    //   subject: 'Verify User',
    //   html: `
    //             <h3>Hello ${user.firstName}!</h3>
    //             <p>Please use this <a href="${confirmLink}">link</a> to confirm your account.</p>
    //         `
    // });
  }

  async signUser(user: IUser, withStatusCheck = true): Promise<string> {
    if (withStatusCheck && user.status !== statusEnum.active) {
      throw new MethodNotAllowedException();
    }

    const tokenPayload: ITokenPayload = {
      _id: user.id,
      status: user.status,
      roles: user.roles
    };
    const token = await this.generateToken(tokenPayload);
    const expireAt = moment().add(1, 'day').toISOString();

    await this.saveToken({
      token,
      expireAt,
      uId: user._id
    });

    return token;
  }

  async confirm(token: string): Promise<IUser> {
    const data = await this.verifyToken(token);
    const user = await this.userService.find(data._id);

    await this.tokenService.delete(data._id, token);

    if (user && user.status === statusEnum.pending) {
      user.status = statusEnum.active;
      return user.save();
    }
    throw new BadRequestException('Confirmation error');
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<boolean> {
    const user = await this.userService.findByEmail(forgotPasswordDto.email);

    if (!user) {
      throw new BadRequestException('Invalid email');
    }

    const token: string = await this.signUser(user);

    const confirmLink = `localhost:${process.env.PORT}/auth/changePassword?token=${token}`;
    console.log('forgotPassword', confirmLink);
    // await this.mailService.send({
    //   from: this.configService.get<string>('JS_CODE_MAIL'),
    //   to: user.email,
    //   subject: 'Verify User',
    //   html: `
    //             <h3>Hello ${user.firstName}!</h3>
    //             <p>Please use this <a href="${confirmLink}">link</a> to reset your password.</p>
    //         `,
    // });

    return true;
  }
}
