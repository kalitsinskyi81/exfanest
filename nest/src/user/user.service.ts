import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';
import { Model } from 'mongoose';

import { IUser } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  private readonly saltRounds = 10;

  constructor(@InjectModel('User') private readonly userModel: Model<IUser>) {}

  async create(createUserDto: CreateUserDto, roles: Array<string>): Promise<IUser> {
    const salt = await bcrypt.genSalt(this.saltRounds);
    const hash = await bcrypt.hash(createUserDto.password, salt);

    const createdUser = new this.userModel(
      _.assignIn(createUserDto, {
        password: hash,
        roles
      })
    );

    return await createdUser.save();
  }

  async find(id: string): Promise<IUser> {
    return await this.userModel.findById(id).exec();
  }

  async findByEmail(email: string): Promise<IUser> {
    return await this.userModel.findOne({ email }).exec();
  }

  async update(id: string, payload: Partial<IUser>) {
    return this.userModel.updateOne({ _id: id }, payload);
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.saltRounds);

    return await bcrypt.hash(password, salt);
  }
}
