"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRouter = void 0;
const express_1 = __importDefault(require("express"));
const order_contoller_1 = require("./order.contoller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_1 = require("../../../enum/user");
const router = express_1.default.Router();
router.patch('/:id', (0, auth_1.default)(user_1.AUTHUSER.ADMIN), order_contoller_1.OrderController.updateOrder);
router.post('/create-order', (0, auth_1.default)(user_1.AUTHUSER.CUSTOMER), order_contoller_1.OrderController.createOrder);
router.get('/:id', (0, auth_1.default)(user_1.AUTHUSER.CUSTOMER, user_1.AUTHUSER.ADMIN), order_contoller_1.OrderController.getSingleBook);
router.get('/', (0, auth_1.default)(user_1.AUTHUSER.CUSTOMER, user_1.AUTHUSER.ADMIN), order_contoller_1.OrderController.getAllOrders);
router.delete('/:id', (0, auth_1.default)(user_1.AUTHUSER.ADMIN), order_contoller_1.OrderController.deleteOrder);
exports.OrderRouter = router;
