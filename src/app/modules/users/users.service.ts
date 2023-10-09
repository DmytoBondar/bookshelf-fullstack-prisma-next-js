import { User, UserRole } from "@prisma/client";
import prisma from "../../../shared/prisma";
import ApiError from "../../../errors/apiError";
import httpStatus from "http-status";
import { JwtPayload } from "jsonwebtoken";

const getAllUsers = async (user: JwtPayload): Promise<User[] | null | User> => {
    const isUserExist = await prisma.user.findFirst({
        where: {
            email: user.email
        }
    })
    if (!isUserExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Use is not Exist');
    };

    if (isUserExist && isUserExist.role === UserRole.customer) {
        const result = await prisma.user.findUnique({
            where: {
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
    getSingleUser,
    updateUser,
    deleteUser,
    getAllUsers
}