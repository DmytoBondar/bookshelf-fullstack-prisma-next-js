import express from 'express';
import { UserRouter } from '../modules/users/users.route';
import { CategoryRouter } from '../modules/category/category.route';
import { BookRouter } from '../modules/book/book.route';
import { ReviewAndRatingRouter } from '../modules/reviewAndRatings/reviewAndRatings.route';
import { OrderRouter } from '../modules/order/order.route';
import { AuthRouter } from '../modules/auth/auth.route';

const router = express.Router();

const moduleRoutes = [
    {
        path: '/users',
        route: UserRouter
    },
    {
        path: '/auth',
        route: AuthRouter
    },
    {
        path: '/categories',
        route: CategoryRouter
    },
    {
        path: '/books',
        route: BookRouter
    },
    {
        path: '/review-ratings',
        route: ReviewAndRatingRouter
    },
    {
        path: '/orders',
        route: OrderRouter
    }
]

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;