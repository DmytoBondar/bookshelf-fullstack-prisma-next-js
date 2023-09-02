import express from 'express';
import { UserRouter } from '../modules/users/users.route';

const router = express.Router();

const moduleRoutes = [
    {
        path: '/auth',
        route: UserRouter
    }
]

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;