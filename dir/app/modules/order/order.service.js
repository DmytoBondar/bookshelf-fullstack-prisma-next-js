"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const apiError_1 = __importDefault(require("../../../errors/apiError"));
const http_status_1 = __importDefault(require("http-status"));
const createOrder = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.order.create({
        data: payload
    });
    return result;
});
const getAllOrder = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield prisma_1.default.user.findFirst({
        where: {
            email: user.email
        }
    });
    if (!isUserExist) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, "User is not exists !!");
    }
    ;
    if (isUserExist.role === client_1.UserRole.customer) {
        const data = yield prisma_1.default.order.findMany({
            where: {
                userId: isUserExist.id
            },
            include: {
                user: true
            }
        });
        return data;
    }
    const result = yield prisma_1.default.order.findMany({
        include: {
            user: true
        }
    });
    return result;
});
const getSingleOrder = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield prisma_1.default.user.findFirst({
        where: {
            email: user.email
        }
    });
    if (!isUserExist) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, "User is not exists !!");
    }
    ;
    if (isUserExist.role === client_1.UserRole.customer) {
        const result = yield prisma_1.default.order.findUnique({
            where: {
                id,
                userId: isUserExist.id
            },
            include: {
                user: true
            }
        });
        return result;
    }
    const result = yield prisma_1.default.order.findUnique({
        where: {
            id
        },
        include: {
            user: true
        }
    });
    return result;
});
const deleteOrder = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.order.delete({
        where: {
            id
        }
    });
    return result;
});
const updateOrder = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.order.update({
        where: {
            id
        },
        data: payload
    });
    return result;
});
exports.OrderService = {
    createOrder,
    getAllOrder,
    getSingleOrder,
    updateOrder,
    deleteOrder
};
