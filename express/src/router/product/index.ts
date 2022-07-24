import express from 'express';
import { getAll, addProduct, editProduct, removeProduct } from './controller';
import { createProductValidator, updateProductValidator, userIdParamsValidator } from './validators';
import { idParamsValidator } from '../../requestValidator/common';

const router = express.Router();

router.get('/', getAll);

router.post('/:userId', userIdParamsValidator, createProductValidator, addProduct);

router.put('/:id', idParamsValidator, updateProductValidator, editProduct);

router.delete('/:id', idParamsValidator, removeProduct);

export default router;
