import { User } from '@prisma/client';
import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { UserService } from './users.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { ILoginResponse } from './users.interface';
import config from '../../../config';
import { JwtPayload } from 'jsonwebtoken';

const createUser = catchAsync(async (req: Request, res: Response) => {
    const result = await UserService.createUser(req.body);
    sendResponse<User>(res, {
        statusCode: httpStatus.OK,
        message: "User Created Successfully !!",
        success: true,
        data: result
    })
})

const UserSignIn = catchAsync(async (req: Request, res: Response) => {
    const result = await UserService.loginUser(req.body);
    const {refreshToken, ...others} = result;
    const {accessToken} = others
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
    const {refreshToken} = req.cookies;
    const result = await UserService.refreshToken(refreshToken);
    const {refreshToken: reTken, ...others} = result;
    const {accessToken} = others
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

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
    const result = await UserService.getSingleUser(req.params.id);
    sendResponse<User>(res, {
        statusCode: httpStatus.OK,
        message: "User Retrive Successfully !!",
        success: true,
        data: result
    })
})

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
    const result = await UserService.getAllUsers(req.user as JwtPayload);
    sendResponse<User[] | User>(res, {
        statusCode: httpStatus.OK,
        message: "User Retrive Successfully !!",
        success: true,
        data: result
    })
})

const updateSingleUser = catchAsync(async (req: Request, res: Response) => {
    const result = await UserService.updateUser(req.params.id, req.body);
    sendResponse<User>(res, {
        statusCode: httpStatus.OK,
        message: "User Updated Successfully !!",
        success: true,
        data: result
    })
})

const deleteSingleUser = catchAsync(async (req: Request, res: Response) => {
    const result = await UserService.deleteUser(req.params.id);
    sendResponse<User>(res, {
        statusCode: httpStatus.OK,
        message: "User deleted Successfully !!",
        success: true,
        data: result
    })
})

export const UserController = {
    createUser,
    getSingleUser,
    updateSingleUser,
    deleteSingleUser,
    getAllUsers,
    UserSignIn,
    refreshToken
}