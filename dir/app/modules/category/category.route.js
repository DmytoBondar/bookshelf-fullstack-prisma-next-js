"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRouter = void 0;
const express_1 = __importDefault(require("express"));
const category_contoller_1 = require("./category.contoller");
const user_1 = require("../../../enum/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.patch('/:id', (0, auth_1.default)(user_1.AUTHUSER.ADMIN), category_contoller_1.CategoryController.updateCategory);
router.post('/create-category', (0, auth_1.default)(user_1.AUTHUSER.ADMIN, user_1.AUTHUSER.CUSTOMER), category_contoller_1.CategoryController.createCategory);
router.get('/:id', category_contoller_1.CategoryController.getSingleCategories);
router.get('/', category_contoller_1.CategoryController.getAllCategories);
router.delete('/:id', (0, auth_1.default)(user_1.AUTHUSER.ADMIN, user_1.AUTHUSER.CUSTOMER), category_contoller_1.CategoryController.deleteCategory);
exports.CategoryRouter = router;
