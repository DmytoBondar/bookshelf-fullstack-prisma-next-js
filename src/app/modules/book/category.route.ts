import express from 'express';
import { BookController } from './book.contoller';

const router = express.Router();

router.patch('/:id', BookController.updateBook);
router.post('/create-book', BookController.createBook);
router.get('/:id', BookController.getSingleBook);
router.get('/', BookController.getAllBook);
router.delete('/:id', BookController.deleteBook);

export const BookRouter = router;