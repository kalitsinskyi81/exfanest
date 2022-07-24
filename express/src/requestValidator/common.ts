import Joi from 'joi';
import { paramsValidator, ValidatorRequestParams } from './index';

const idSchema = Joi.object({
  id: Joi.string().required()
});
export type IdParamsRequest = ValidatorRequestParams<{
  id: string;
}>;
export const idParamsValidator = paramsValidator(idSchema);
