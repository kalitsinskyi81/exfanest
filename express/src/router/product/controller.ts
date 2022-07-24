import { Request, Response } from 'express';
import { getProducts, createProduct, updateProduct, deleteProduct } from '@mongo/product/controller';
import { IProduct } from '@mongo/product/model';

import { CreateProductRequest, UpdateProductRequest } from './validators';
import { IdParamsRequest } from '../../requestValidator/common';

export const getAll = async (req: Request, res: Response) => {
  const products: IProduct[] = await getProducts();

  return res.send(products);
};

export const addProduct = async (req: CreateProductRequest, res: Response) => {
  const { error, message, statusCode, response } = await createProduct(req.params.userId, req.body);

  if (error) {
    res.status(statusCode).send(message);
  }
  res.status(statusCode).send(response);
};

export const editProduct = async (req: UpdateProductRequest, res: Response) => {
  const response: IProduct | null = await updateProduct(req.params.id, req.body);

  res.send(response);
};

export const removeProduct = async (req: IdParamsRequest, res: Response) => {
  const productId = req.params.id;

  await deleteProduct(productId);

  res.send(productId);
};
