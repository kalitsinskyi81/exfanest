import { Request, Response } from 'express';
import { getAllUsers, createUser, updateUser, deleteUser } from '@mongo/user/controller';
import { IUser } from '@mongo/user/model';

import { CreateUserRequest, UpdateUserRequest } from './validators';
import { IdParamsRequest } from '../../requestValidator/common';

export const getAll = async (req: Request, res: Response) => {
  const users: IUser[] = await getAllUsers();

  return res.send(users);
};

export const addUser = async (req: CreateUserRequest, res: Response) => {
  const response: IUser = await createUser(req.body);

  res.status(201).send(response);
};

export const editUser = async (req: UpdateUserRequest, res: Response) => {
  const response: IUser | null = await updateUser(req.params.id, req.body);

  res.status(201).send(response);
};

export const removeUser = async (req: IdParamsRequest, res: Response) => {
  const userId = req.params.id;

  await deleteUser(userId);

  res.send(userId);
};
