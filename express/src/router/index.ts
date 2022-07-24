import express from 'express';

import userRouter from './user';
import productRouter from './product';

const router = express.Router();

router.use('/users', userRouter);
router.use('/products', productRouter);

export default router;
