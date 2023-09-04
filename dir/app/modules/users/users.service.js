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
exports.UserService = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const apiError_1 = __importDefault(require("../../../errors/apiError"));
const http_status_1 = __importDefault(require("http-status"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const config_1 = __importDefault(require("../../../config"));
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { password } = payload;
    const isUserExist = yield prisma_1.default.user.findUnique({
        where: {
            email: payload.email
        }
    });
    if (!isUserExist) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, "User is not found");
    }
    const isPasswordMatched = yield bcrypt_1.default.compare(password, isUserExist.password);
    if (isUserExist && !isPasswordMatched) {
        throw new apiError_1.default(http_status_1.default.UNAUTHORIZED, "Password is not Matched");
    }
    ;
    const { email, role } = isUserExist;
    const accessToken = jwtHelpers_1.JWTHelpers.createAccessToken({ email, role }, config_1.default.jwt.secret, config_1.default.jwt.expired_in);
    const refreshToken = jwtHelpers_1.JWTHelpers.createAccessToken({ email }, config_1.default.jwt.refresh_token, config_1.default.jwt.expired_in);
    return { accessToken, refreshToken };
});
const refreshToken = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    let verfiedToken = null;
    try {
        verfiedToken = jwtHelpers_1.JWTHelpers.verfiedToken(payload, config_1.default.jwt.secret);
    }
    catch (err) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'Invalid Secret key');
    }
    const { email: verifyEmail } = verfiedToken;
    const isUserExist = yield prisma_1.default.user.findUnique({ where: { email: verifyEmail } });
    if (!isUserExist) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'User is not Found !!');
    }
    const { email, role } = isUserExist;
    const accessToken = jwtHelpers_1.JWTHelpers.createAccessToken({ email, role }, config_1.default.jwt.secret, config_1.default.jwt.expired_in);
    const refreshToken = jwtHelpers_1.JWTHelpers.createAccessToken({ email, role }, config_1.default.jwt.secret, config_1.default.jwt.expired_in);
    return {
        accessToken,
        refreshToken
    };
});
const createUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (payload.password) {
        payload.password = yield bcrypt_1.default.hashSync(payload.password, 12);
    }
    const result = yield prisma_1.default.user.create({
        data: payload
    });
    return result;
});
const getAllUsers = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield prisma_1.default.user.findFirst({
        where: {
            email: user.email
        }
    });
    if (!isUserExist) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'Use is not Exist');
    }
    ;
    if (isUserExist && isUserExist.role === client_1.UserRole.customer) {
        const result = yield prisma_1.default.user.findUnique({
            where: {
                id: isUserExist.id
            }
        });
        return result;
    }
    const result = yield prisma_1.default.user.findMany();
    return result;
});
const getSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.findUnique({
        where: {
            id
        }
    });
    return result;
});
const updateUser = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.update({
        where: {
            id
        },
        data
    });
    return result;
});
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.delete({
        where: {
            id
        }
    });
    return result;
});
exports.UserService = {
    createUser,
    getSingleUser,
    updateUser,
    deleteUser,
    getAllUsers,
    loginUser,
    refreshToken
};
