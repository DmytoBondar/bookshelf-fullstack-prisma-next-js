import { Order, OrderStatus, UserRole } from "@prisma/client"
import prisma from "../../../shared/prisma"
import ApiError from "../../../errors/apiError";
import httpStatus from "http-status";
import { JwtPayload } from "jsonwebtoken";
import { JsonValue } from "@prisma/client/runtime/library";

interface IPayload {
    userId: string;
    orderBooks: string;
    status: OrderStatus
}

const createOrder = async (payload: IPayload): Promise<Order> => {
    const result = await prisma.order.create({
        data: payload
    })
    return result;
};

const getAllOrder = async (user: JwtPayload): Promise<Order[] | null> => {

    const isUserExist = await prisma.user.findFirst({
        where: {
            email: user.email
        }
    })
    if (!isUserExist) {
        throw new ApiError(httpStatus.NOT_FOUND, "User is not exists !!");
    };
    if (isUserExist.role === UserRole.customer) {
        const data = await prisma.order.findMany({
            where: {
                userId: isUserExist.id
            },
            include: {
                user: true
            }
        });
        return data
    }
    const result = await prisma.order.findMany({
        include: {
            user: true
        }
    });
    return result
}

const getSingleOrder = async (id: string, user: JwtPayload): Promise<Order | null> => {
    const isUserExist = await prisma.user.findFirst({
        where: {
            email: user.email
        }
    })
    if (!isUserExist) {
        throw new ApiError(httpStatus.NOT_FOUND, "User is not exists !!");
    };

    if (isUserExist.role === UserRole.customer) {
        const result = await prisma.order.findUnique({
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

    const result = await prisma.order.findUnique({
        where: {
            id
        },
        include: {
            user: true
        }
    });
    return result
}

const deleteOrder = async (id: string): Promise<Order | null> => {
    const result = await prisma.order.delete({
        where: {
            id
        }
    });
    return result
}

const updateOrder = async (id: string, payload: Partial<IPayload>): Promise<Order | null> => {
    const result = await prisma.order.update({
        where: {
            id
        },
        data: payload
    });
    return result
}

export const OrderService = {
    createOrder,
    getAllOrder,
    getSingleOrder,
    updateOrder,
    deleteOrder
}