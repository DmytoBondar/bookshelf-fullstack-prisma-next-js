import express from 'express';
import { OrderController } from './order.contoller';
import auth from '../../middlewares/auth';
import { AUTHUSER } from '../../../enum/user';

const router = express.Router();

router.patch('/:id', OrderController.updateOrder);
router.post('/create-order', OrderController.createOrder);
router.get('/:id',auth(AUTHUSER.CUSTOMER, AUTHUSER.ADMIN), OrderController.getSingleBook);
router.get('/',auth(AUTHUSER.CUSTOMER, AUTHUSER.ADMIN), OrderController.getAllOrders);
router.delete('/:id', OrderController.deleteOrder);

export const OrderRouter = router;