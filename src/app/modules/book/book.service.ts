import { Book } from "@prisma/client"
import prisma from "../../../shared/prisma"

const createBook = async (payload: Book): Promise<Book> => {
    const result = await prisma.book.create({
        data: payload,
        include: {
            category: true
        }
    })
    return result;
};

const getAllBooks = async (): Promise<Book[] | null> => {
    const result = await prisma.book.findMany();
    return result
}

const getSingleBooks = async (id: string): Promise<Book | null> => {
    const result = await prisma.book.findUnique({
        where: {
            id
        }
    });
    return result
}

const deleteBook = async (id: string): Promise<Book | null> => {
    const result = await prisma.book.delete({
        where: {
            id
        }
    });
    return result
}

const updateBook = async (id: string, payload: Partial<Book>): Promise<Book | null> => {
    const result = await prisma.book.update({
        where: {
            id
        },
        data: payload
    });
    return result
}

export const BookService = {
    createBook,
    getAllBooks,
    getSingleBooks,
    deleteBook,
    updateBook
}