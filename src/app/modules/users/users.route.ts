import express from 'express';
import { UserController } from './users.controller';
import auth from '../../middlewares/auth';
import { AUTHUSER } from '../../../enum/user';

const router = express.Router();

router.get('/:id', UserController.getSingleUser);
router.get('/',
    auth(
        AUTHUSER.ADMIN
        ),
    UserController.getAllUsers);
router.post('/signup', UserController.createUser);
router.patch('/:id', UserController.updateSingleUser);
router.delete('/:id', UserController.deleteSingleUser);
router.post('/signin', UserController.UserSignIn);
router.post('/refresh-token', UserController.refreshToken);

export const UserRouter = router;