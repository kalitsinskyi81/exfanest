import { Document } from 'mongoose';

export interface ITokenInterface extends Document {
  readonly token: string;
  readonly uId: string;
  readonly expireAt: string;
}
