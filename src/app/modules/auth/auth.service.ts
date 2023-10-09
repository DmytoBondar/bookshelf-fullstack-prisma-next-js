import { User } from "@prisma/client";
import prisma from "../../../shared/prisma";
import bcrypt from 'bcrypt';
import ApiError from "../../../errors/apiError";
import httpStatus from "http-status";
import { JWTHelpers } from "../../../helpers/jwtHelpers";
import config from "../../../config";
import { Secret } from "jsonwebtoken";
import { ILogin, ILoginResponse } from "./auth.interface";

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
    const { email, role, id: userId } = isUserExist;
    const accessToken = JWTHelpers.createAccessToken(
        { userId, email, role },
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
    const { email, role, id: userId } = isUserExist;
    const accessToken =
        JWTHelpers.createAccessToken(
            { userId, email, role },
            config.jwt.secret as Secret,
            config.jwt.expired_in as string
        )
    const refreshToken =
        JWTHelpers.createAccessToken(
            { userId, email, role },
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

export const AuthService = {
    createUser,
    loginUser,
    refreshToken
}