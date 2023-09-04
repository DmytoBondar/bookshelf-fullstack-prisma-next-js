import { User, UserRole } from "@prisma/client";
import prisma from "../../../shared/prisma";
import bcrypt from 'bcrypt';
import ApiError from "../../../errors/apiError";
import httpStatus from "http-status";
import { JWTHelpers } from "../../../helpers/jwtHelpers";
import config from "../../../config";
import { JwtPayload, Secret } from "jsonwebtoken";
import { ILogin, ILoginResponse } from "./users.interface";

const loginUser = async (payload: ILogin): Promise<ILoginResponse> => {
    const { password } = payload;
    const isUserExist = await prisma.user.findUnique({
        where: {
            email: payload.email
        }
    })
    if (!isUserExist) {
        throw new ApiError(httpStatus.NOT_FOUND, "User is not found")
    }
    const isPasswordMatched = await bcrypt.compare(password, isUserExist.password);
    if (isUserExist && !isPasswordMatched) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "Password is not Matched");
    };
    const { email, role } = isUserExist;
    const accessToken = JWTHelpers.createAccessToken(
        { email, role },
        config.jwt.secret as Secret,
        config.jwt.expired_in as string
    )

    const refreshToken = JWTHelpers.createAccessToken(
        { email },
        config.jwt.refresh_token as Secret,
        config.jwt.expired_in as string
    )

    return { accessToken, refreshToken }
}

const refreshToken = async (payload: string): Promise<ILoginResponse> => {
    let verfiedToken = null;
    try {
        verfiedToken = JWTHelpers.verfiedToken(payload, config.jwt.secret as Secret);
    } catch (err) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Invalid Secret key')
    }
    const { email: verifyEmail } = verfiedToken;

    const isUserExist = await prisma.user.findUnique({ where: { email: verifyEmail } });
    if (!isUserExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User is not Found !!')
    }
    const { email, role } = isUserExist;
    const accessToken =
        JWTHelpers.createAccessToken(
            { email, role },
            config.jwt.secret as Secret,
            config.jwt.expired_in as string
        )
    const refreshToken =
        JWTHelpers.createAccessToken(
            { email, role },
            config.jwt.secret as Secret,
            config.jwt.expired_in as string
        )
    return {
        accessToken,
        refreshToken
    }
}

const createUser = async (payload: User): Promise<User> => {
    if (payload.password) {
        payload.password = await bcrypt.hashSync(payload.password, 12);
    }
    const result = await prisma.user.create({
        data: payload
    })
    return result;
}

const getAllUsers = async (user:JwtPayload): Promise<User[] | null | User> => {
    const isUserExist = await prisma.user.findFirst({
        where: {
            email: user.email
        }
    })
    if(!isUserExist){
        throw new ApiError(httpStatus.NOT_FOUND, 'Use is not Exist');
    };

    if(isUserExist && isUserExist.role === UserRole.customer){
        const result = await prisma.user.findUnique({
            where:{
                id: isUserExist.id
            }
        });
        return result
    }

    const result = await prisma.user.findMany()
    return result;
}

const getSingleUser = async (id: string): Promise<User | null> => {
    const result = await prisma.user.findUnique({
        where: {
            id
        }
    })
    return result;
}

const updateUser = async (id: string, data: Partial<User>): Promise<User | null> => {
    const result = await prisma.user.update({
        where: {
            id
        },
        data
    })
    return result;
}

const deleteUser = async (id: string): Promise<User | null> => {
    const result = await prisma.user.delete({
        where: {
            id
        }
    })
    return result;
}

export const UserService = {
    createUser,
    getSingleUser,
    updateUser,
    deleteUser,
    getAllUsers,
    loginUser,
    refreshToken
}