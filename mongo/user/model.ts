import { Schema, model, Document } from 'mongoose';

import Product, { IProduct } from '../product/model';

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  products: IProduct[];
}

export type ICreateUser = Pick<IUser, 'name' | 'email' | 'password'>;
export type IUpdateUser = Pick<ICreateUser, 'name'>;
export type IDBUser = IUser & Document;

const UserSchema: Schema = new Schema(
  {
    name: String,
    email: {
      type: String,
      index: true,
      unique: true
    },
    password: String,
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
  },
  { versionKey: false }
);

UserSchema.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret) {
    delete ret._id;
    delete ret.password;
  }
});

UserSchema.pre('deleteOne', function () {
  const userId = this?._conditions?._id;

  if (userId) {
    // TODO investigate how to manage relations
    Product.deleteMany({ userId });
  }
});

export default model<IDBUser>('User', UserSchema);
