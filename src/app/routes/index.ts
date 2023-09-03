import express from 'express';
import { UserRouter } from '../modules/users/users.route';
import { CategoryRouter } from '../modules/category/category.route';
import { BookRouter } from '../modules/book/category.route';

const router = express.Router();

const moduleRoutes = [
    {
        path: '/auth',
        route: UserRouter
    },
    {
        path: '/category',
        route: CategoryRouter
    },
    {
        path: '/books',
        route: BookRouter
    }
]

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;