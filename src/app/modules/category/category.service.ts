import { Category } from "@prisma/client"
import prisma from "../../../shared/prisma"

const createCategory = async (payload: Category): Promise<Category> => {
    const result = await prisma.category.create({
        data: payload,
        include: {
            books: true
        }
    })
    return result;
};

const getAllCategories = async (): Promise<Category[] | null> => {
    const result = await prisma.category.findMany();
    return result
}

const getSingleCategories = async (id: string): Promise<Category | null> => {
    const result = await prisma.category.findUnique({
        where: {
            id
        }
    });
    return result
}

const deleteCategories = async (id: string): Promise<Category | null> => {
    const result = await prisma.category.delete({
        where: {
            id
        }
    });
    return result
}

const updateCategories = async (id: string, payload: Partial<Category>): Promise<Category | null> => {
    const result = await prisma.category.update({
        where: {
            id
        },
        data: payload
    });
    return result
}

export const CategoryService = {
    createCategory,
    getAllCategories,
    getSingleCategories,
    deleteCategories,
    updateCategories
}