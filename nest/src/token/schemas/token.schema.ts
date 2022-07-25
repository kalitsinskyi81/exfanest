import { Schema } from 'mongoose';

const TokenSchema = new Schema({
  token: { type: String, required: true },
  uId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  expireAt: { type: Date, required: true }
});

TokenSchema.index({ token: 1, uId: 1 }, { unique: true });

export default TokenSchema;
