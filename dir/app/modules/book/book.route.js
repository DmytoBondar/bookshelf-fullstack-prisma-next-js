"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRouter = void 0;
const express_1 = __importDefault(require("express"));
const book_contoller_1 = require("./book.contoller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_1 = require("../../../enum/user");
const router = express_1.default.Router();
router.patch('/:id', (0, auth_1.default)(user_1.AUTHUSER.ADMIN), book_contoller_1.BookController.updateBook);
router.post('/create-book', (0, auth_1.default)(user_1.AUTHUSER.ADMIN), book_contoller_1.BookController.createBook);
router.get('/:id', book_contoller_1.BookController.getSingleBook);
router.get('/', book_contoller_1.BookController.getAllBook);
router.delete('/:id', (0, auth_1.default)(user_1.AUTHUSER.ADMIN), book_contoller_1.BookController.deleteBook);
exports.BookRouter = router;
