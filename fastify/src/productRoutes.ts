import { FastifyPluginAsync, RouteShorthandOptions } from 'fastify';
import { Static, Type } from '@sinclair/typebox';

import { getProducts, createProduct, updateProduct, deleteProduct } from '@mongo/product/controller';

const productRoutes: FastifyPluginAsync<{ route: string }> = async (fastify, { route }): Promise<void> => {
  fastify.get(route, getProducts);

  const CreateProductBody = Type.Object({
    name: Type.String(),
    price: Type.String()
  });
  const CreateProductParams = Type.Object({
    userId: Type.String()
  });
  type CreateBody = Static<typeof CreateProductBody>;
  type CreateParams = Static<typeof CreateProductParams>;
  interface CreateProduct {
    Body: CreateBody;
    Params: CreateParams;
  }
  const createProductOptions: RouteShorthandOptions = {
    schema: {
      body: CreateProductBody,
      params: CreateProductParams
    }
  };
  fastify.post<CreateProduct>(`${route}/:userId`, createProductOptions, async (request, reply) => {
    const { params, body } = request;
    const { error, message, statusCode, response } = await createProduct(params.userId, body);

    reply.code(statusCode);

    if (error) {
      return { message };
    }

    return response;
  });

  const UpdateProductBody = Type.Object({
    name: Type.Optional(Type.String()),
    price: Type.Optional(Type.String())
  });
  const UpdateProductParams = Type.Object({
    id: Type.String()
  });
  type UpdateBody = Static<typeof UpdateProductBody>;
  type UpdateParams = Static<typeof UpdateProductParams>;
  interface UpdateProduct {
    Body: UpdateBody;
    Params: UpdateParams;
  }
  const updateProductOptions: RouteShorthandOptions = {
    schema: {
      body: UpdateProductBody,
      params: UpdateProductParams
    }
  };
  fastify.put<UpdateProduct>(`${route}/:id`, updateProductOptions, (request) => {
    const { body, params } = request;

    return updateProduct(params.id, body);
  });

  const DeleteProductParams = Type.Object({
    id: Type.String()
  });
  type DeleteParams = Static<typeof DeleteProductParams>;
  interface DeleteProduct {
    Params: DeleteParams;
  }
  const deleteProductOptions: RouteShorthandOptions = {
    schema: {
      params: DeleteProductParams
    }
  };
  fastify.delete<DeleteProduct>(`${route}/:id`, deleteProductOptions, (request) => {
    return deleteProduct(request.params.id);
  });
};

export default productRoutes;
