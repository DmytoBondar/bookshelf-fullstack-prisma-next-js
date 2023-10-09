import { User } from '@prisma/client';
import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import config from '../../../config';
import { ILoginResponse } from './auth.interface';
import { AuthService } from './auth.service';

const createUser = catchAsync(async (req: Request, res: Response) => {
    const result = await AuthService.createUser(req.body);
    sendResponse<User>(res, {
        statusCode: httpStatus.OK,
        message: "User Created Successfully !!",
        success: true,
        data: result
    })
})

const UserSignIn = catchAsync(async (req: Request, res: Response) => {
    const result = await AuthService.loginUser(req.body);
    const { refreshToken, ...others } = result;
    const { accessToken } = others
    const cookieOptions = {
        secure: config.env === 'production',
        httpOnly: true
    }
    res.cookie('refreshToken', refreshToken, cookieOptions)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: "User Login Successfully !!",
        success: true,
        token: accessToken
    })
})

const refreshToken = catchAsync(async (req: Request, res: Response) => {
    const { refreshToken } = req.cookies;
    const result = await AuthService.refreshToken(refreshToken);
    const { refreshToken: reTken, ...others } = result;
    const { accessToken } = others
    const cookieOptions = {
        secure: config.env === 'production',
        httpOnly: true
    }
    res.cookie('refreshToken', reTken, cookieOptions)
    sendResponse<ILoginResponse>(res, {
        statusCode: httpStatus.OK,
        message: "User Login Successfully !!",
        success: true,
        token: accessToken
    })
})

export const AuthController = {
    createUser,
    UserSignIn,
    refreshToken
}