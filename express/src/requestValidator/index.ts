import {
  ContainerTypes,
  // Use this as a replacement for express.Request
  ValidatedRequest,
  // Extend from this to define a valid schema type/interface
  ValidatedRequestSchema,
  // Creates a validator that generates middlewares
  createValidator
} from 'express-joi-validation';

const validator = createValidator();

export const bodyValidator = validator.body;
interface Body<T> extends ValidatedRequestSchema {
  [ContainerTypes.Body]: T;
}
export type ValidatorRequestBody<T> = ValidatedRequest<Body<T>>;

export const paramsValidator = validator.params;
interface Params<T> extends ValidatedRequestSchema {
  [ContainerTypes.Params]: T;
}
export type ValidatorRequestParams<T> = ValidatedRequest<Params<T>>;

interface BodyAndParams<B, P> extends ValidatedRequestSchema {
  [ContainerTypes.Body]: B;
  [ContainerTypes.Params]: P;
}
export type ValidatorRequestBodyAndParams<B, P> = ValidatedRequest<BodyAndParams<B, P>>;

// export const queryValidator = validator.query;
// interface Query<T> extends ValidatedRequestSchema {
//   [ContainerTypes.Query]: T;
// }
// export type ValidatorRequestQuery<T> = ValidatedRequest<Query<T>>;
