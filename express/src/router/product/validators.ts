import Joi from 'joi';

import { paramsValidator, ValidatorRequestParams, bodyValidator, ValidatorRequestBody, ValidatorRequestBodyAndParams } from '../../requestValidator';

const createSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.string().required()
});
export type CreateProductRequest = ValidatorRequestBodyAndParams<
  {
    name: string;
    price: string;
  },
  {
    userId: string;
  }
>;

export const createProductValidator = bodyValidator(createSchema);

const updateSchema = Joi.object({
  name: Joi.string(),
  price: Joi.string()
});
export type UpdateProductRequest = ValidatorRequestBody<{
  name?: string;
  price?: string;
}>;
export const updateProductValidator = bodyValidator(updateSchema);

const userIdSchema = Joi.object({
  userId: Joi.string().required()
});
export type UserIdParamsRequest = ValidatorRequestParams<{
  userId: string;
}>;
export const userIdParamsValidator = paramsValidator(userIdSchema);
