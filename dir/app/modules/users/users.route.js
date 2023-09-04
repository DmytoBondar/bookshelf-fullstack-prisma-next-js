"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = __importDefault(require("express"));
const users_controller_1 = require("./users.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_1 = require("../../../enum/user");
const router = express_1.default.Router();
router.get('/:id', (0, auth_1.default)(user_1.AUTHUSER.ADMIN), users_controller_1.UserController.getSingleUser);
router.get('/', (0, auth_1.default)(user_1.AUTHUSER.ADMIN, user_1.AUTHUSER.CUSTOMER), users_controller_1.UserController.getAllUsers);
router.post('/signup', users_controller_1.UserController.createUser);
router.patch('/:id', (0, auth_1.default)(user_1.AUTHUSER.ADMIN, user_1.AUTHUSER.ADMIN), users_controller_1.UserController.updateSingleUser);
router.delete('/:id', (0, auth_1.default)(user_1.AUTHUSER.ADMIN), users_controller_1.UserController.deleteSingleUser);
router.post('/signin', users_controller_1.UserController.UserSignIn);
router.post('/refresh-token', users_controller_1.UserController.refreshToken);
exports.UserRouter = router;
