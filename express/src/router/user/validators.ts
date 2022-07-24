import Joi from 'joi';

import { paramsValidator, ValidatorRequestParams, bodyValidator, ValidatorRequestBody, ValidatorRequestBodyAndParams } from '../../requestValidator';

const createSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required()
});
export type CreateUserRequest = ValidatorRequestBody<{
  // TODO somehow come up hot to convert joi schema to ts interface
  name: string;
  email: string;
  password: string;
}>;
export const createUserValidator = bodyValidator(createSchema);

const updateSchema = Joi.object({
  name: Joi.string().required()
});
export type UpdateUserRequest = ValidatorRequestBodyAndParams<{ name: string }, { id: string }>;
export const updateUserValidator = bodyValidator(updateSchema);
