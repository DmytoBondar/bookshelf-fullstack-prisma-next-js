"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_route_1 = require("../modules/users/users.route");
const category_route_1 = require("../modules/category/category.route");
const book_route_1 = require("../modules/book/book.route");
const reviewAndRatings_route_1 = require("../modules/reviewAndRatings/reviewAndRatings.route");
const order_route_1 = require("../modules/order/order.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/auth',
        route: users_route_1.UserRouter
    },
    {
        path: '/category',
        route: category_route_1.CategoryRouter
    },
    {
        path: '/books',
        route: book_route_1.BookRouter
    },
    {
        path: '/review-ratings',
        route: reviewAndRatings_route_1.ReviewAndRatingRouter
    },
    {
        path: '/orders',
        route: order_route_1.OrderRouter
    }
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
