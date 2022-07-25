import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ITokenInterface } from './interfaces/token.interface';
import { CreateTokenDto } from './dto/create-token.dto';

@Injectable()
export class TokenService {
  constructor(@InjectModel('Token') private readonly tokenModel: Model<ITokenInterface>) {}

  async create(createTokenDto: CreateTokenDto): Promise<ITokenInterface> {
    const newToken = new this.tokenModel(createTokenDto);

    return await newToken.save();
  }

  async delete(uId: string, token: string): Promise<{ acknowledged: boolean; deletedCount: number }> {
    return this.tokenModel.deleteOne({ uId, token });
  }

  async deleteAll(uId: string): Promise<{ acknowledged: boolean; deletedCount: number }> {
    return this.tokenModel.deleteMany({ uId });
  }

  async exists(uId: string, token: string): Promise<any> {
    return this.tokenModel.exists({ uId, token });
  }
}
