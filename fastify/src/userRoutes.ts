import { FastifyPluginAsync, RouteShorthandOptions } from 'fastify';
import { Static, Type } from '@sinclair/typebox';

import { getAllUsers, createUser, updateUser, deleteUser } from '@mongo/user/controller';
import { IUser } from '@mongo/user/model';

const userRoutes: FastifyPluginAsync<{ route: string }> = async (fastify, { route }): Promise<void> => {
  fastify.get(route, getAllUsers);

  const CreateUserBody = Type.Object({
    name: Type.String(),
    email: Type.String(),
    password: Type.String()
  });
  type CreateBody = Static<typeof CreateUserBody>;
  interface CreateUser {
    Body: CreateBody;
  }
  const createUserOptions: RouteShorthandOptions = {
    schema: {
      body: CreateUserBody
    }
  };
  fastify.post<CreateUser>(route, createUserOptions, async ({ body }, reply) => {
    const response: IUser = await createUser(body);

    return reply.code(201).send(response);
  });

  const UpdateUserBody = Type.Object({
    name: Type.String()
  });
  const UpdateUserParams = Type.Object({
    id: Type.String()
  });
  type UpdateBody = Static<typeof CreateUserBody>;
  type UpdateParams = Static<typeof UpdateUserParams>;
  interface UpdateUser {
    Body: UpdateBody;
    Params: UpdateParams;
  }
  const updateUserOptions: RouteShorthandOptions = {
    schema: {
      body: UpdateUserBody,
      params: UpdateUserParams
    }
  };
  fastify.put<UpdateUser>(`${route}/:id`, updateUserOptions, (request) => {
    const { body, params } = request;
    return updateUser(params.id, body);
  });

  const DeleteUserParams = Type.Object({
    id: Type.String()
  });
  type DeleteParams = Static<typeof DeleteUserParams>;
  interface DeleteUser {
    Params: DeleteParams;
  }
  const deleteUserOptions: RouteShorthandOptions = {
    schema: {
      params: DeleteUserParams
    }
  };
  fastify.delete<DeleteUser>(`${route}/:id`, deleteUserOptions, (request) => {
    return deleteUser(request.params.id);
  });
};

export default userRoutes;
