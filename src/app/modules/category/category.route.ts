import express from 'express';
import { CategoryController } from './category.contoller';
import { AUTHUSER } from '../../../enum/user';
import auth from '../../middlewares/auth';

const router = express.Router();

router.patch('/:id',auth(AUTHUSER.ADMIN), CategoryController.updateCategory);
router.post('/create-category',auth(AUTHUSER.ADMIN, AUTHUSER.CUSTOMER), CategoryController.createCategory);
router.get('/:id', CategoryController.getSingleCategories);
router.get('/', CategoryController.getAllCategories);
router.delete('/:id',auth(AUTHUSER.ADMIN, AUTHUSER.CUSTOMER), CategoryController.deleteCategory);

export const CategoryRouter = router;