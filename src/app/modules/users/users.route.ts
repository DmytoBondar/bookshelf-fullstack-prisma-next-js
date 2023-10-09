import express from 'express';
import { UserController } from './users.controller';
import auth from '../../middlewares/auth';
import { AUTHUSER } from '../../../enum/user';

const router = express.Router();

router.get('/:id', auth(AUTHUSER.ADMIN), UserController.getSingleUser);
router.get('/', auth(AUTHUSER.ADMIN, AUTHUSER.CUSTOMER), UserController.getAllUsers);
router.patch('/:id', auth(AUTHUSER.ADMIN, AUTHUSER.ADMIN), UserController.updateSingleUser);
router.delete('/:id', auth(AUTHUSER.ADMIN), UserController.deleteSingleUser);

export const UserRouter = router;