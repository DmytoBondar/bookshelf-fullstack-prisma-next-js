import express from 'express';
import { OrderController } from './order.contoller';
import auth from '../../middlewares/auth';
import { AUTHUSER } from '../../../enum/user';

const router = express.Router();

router.patch('/:id', auth(AUTHUSER.ADMIN), OrderController.updateOrder);
router.post('/create-order', auth(AUTHUSER.CUSTOMER), OrderController.createOrder);
router.get('/:id', auth(AUTHUSER.CUSTOMER, AUTHUSER.ADMIN), OrderController.getSingleBook);
router.get('/', auth(AUTHUSER.CUSTOMER, AUTHUSER.ADMIN), OrderController.getAllOrders);
router.delete('/:id', auth(AUTHUSER.ADMIN), OrderController.deleteOrder);

export const OrderRouter = router;