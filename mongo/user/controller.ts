import bcrypt from 'bcrypt';

import User, { IUser, ICreateUser, IUpdateUser } from './model';

export const getAllUsers = async (): Promise<IUser[]> => {
  return User.find({}).populate('products');
};

export const createUser = async (body: ICreateUser): Promise<IUser> => {
  const { password, ...rest } = body;
  const passwordSalt = await bcrypt.genSalt(10);
  const hashedPassword = bcrypt.hashSync(password, passwordSalt);
  const newUser = new User({
    ...rest,
    password: hashedPassword
  });

  return await newUser.save();
};

export const updateUser = async (id: string, body: IUpdateUser): Promise<IUser | null> => {
  await User.findByIdAndUpdate(id, body);

  return User.findById(id);
};

export const deleteUser = async (id: string): Promise<string> => {
  await User.deleteOne({ _id: id });

  return id;
};
