import express from 'express';
import { getAll, addUser, editUser, removeUser } from './controller';
import { createUserValidator, updateUserValidator } from './validators';
import { idParamsValidator } from '../../requestValidator/common';

const router = express.Router();

router.get('/', getAll);

router.post('/', createUserValidator, addUser);

router.put('/:id', idParamsValidator, updateUserValidator, editUser);

router.delete('/:id', idParamsValidator, removeUser);

export default router;
