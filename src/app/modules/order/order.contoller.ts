import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { Order } from "@prisma/client";
import { OrderService } from "./order.service";
import { JwtPayload } from "jsonwebtoken";
import { IAuthUserProps } from "../../../interface/commin";

const createOrder =
    catchAsync(async (req: Request, res: Response) => {
        const { userId } = req.user as IAuthUserProps;
        const result = await OrderService.createOrder(userId, req.body);
        sendResponse(res, {
            statusCode: httpStatus.OK,
            message: 'Order Created Successfully',
            success: true,
            data: result
        })
    });

const getAllOrders =
    catchAsync(async (req: Request, res: Response) => {
        const result = await OrderService.getAllOrder(req.user as JwtPayload);
        sendResponse<Order[]>(res, {
            statusCode: httpStatus.OK,
            message: 'Orders Retrives Successfully',
            success: true,
            data: result
        })
    });

const getSingleBook =
    catchAsync(async (req: Request, res: Response) => {
        const result = await OrderService.getSingleOrder(req.params.id, req.user as JwtPayload);
        sendResponse<Order>(res, {
            statusCode: httpStatus.OK,
            message: 'Order Retrive Successfully',
            success: true,
            data: result
        })
    });

const updateOrder =
    catchAsync(async (req: Request, res: Response) => {
        const result = await OrderService.updateOrder(req.params.id, req.body);
        sendResponse<Order>(res, {
            statusCode: httpStatus.OK,
            message: 'Order Updated Successfully',
            success: true,
            data: result
        })
    });

const deleteOrder =
    catchAsync(async (req: Request, res: Response) => {
        const result = await OrderService.deleteOrder(req.params.id);
        sendResponse<Order>(res, {
            statusCode: httpStatus.OK,
            message: 'Order Deleted Successfully',
            success: true,
            data: result
        })
    });

export const OrderController = {
    createOrder,
    getAllOrders,
    getSingleBook,
    updateOrder,
    deleteOrder
}