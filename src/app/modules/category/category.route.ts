import express from 'express';
import { CategoryController } from './category.contoller';

const router = express.Router();

router.patch('/:id', CategoryController.updateCategory);
router.post('/create-category', CategoryController.createCategory);
router.get('/:id', CategoryController.getSingleCategories);
router.get('/', CategoryController.getAllCategories);
router.delete('/:id', CategoryController.deleteCategory);

export const CategoryRouter = router;