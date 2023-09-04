import express from 'express';
import { BookController } from './book.contoller';
import auth from '../../middlewares/auth';
import { AUTHUSER } from '../../../enum/user';

const router = express.Router();

router.patch('/:id',auth(AUTHUSER.ADMIN), BookController.updateBook);
router.post('/create-book',auth(AUTHUSER.ADMIN), BookController.createBook);
router.get('/:id', BookController.getSingleBook);
router.get('/', BookController.getAllBook);
router.delete('/:id',auth(AUTHUSER.ADMIN), BookController.deleteBook);

export const BookRouter = router;