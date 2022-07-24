import { Schema, model, Document } from 'mongoose';

export interface IProduct extends Document {
  id: string;
  name: string;
  price: string;
}

const ProductSchema: Schema = new Schema(
  {
    name: String,
    price: String,
    userId: { type: Schema.Types.ObjectId, ref: 'User' }
  },
  { versionKey: false }
);

ProductSchema.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret) {
    delete ret._id;
  }
});

export default model<IProduct>('Product', ProductSchema);
