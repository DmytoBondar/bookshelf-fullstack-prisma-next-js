import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { Book, Category } from "@prisma/client";
import { BookService } from "./book.service";

const createBook =
    catchAsync(async (req: Request, res: Response) => {
        const result = await BookService.createBook(req.body);

        sendResponse<Book>(res, {
            statusCode: httpStatus.OK,
            message: 'Book Created Successfully',
            success: true,
            data: result
        })
    });

const getAllBook =
    catchAsync(async (req: Request, res: Response) => {
        const result = await BookService.getAllBooks();
        sendResponse<Book[]>(res, {
            statusCode: httpStatus.OK,
            message: 'Books Retrives Successfully',
            success: true,
            data: result
        })
    });

const getSingleBook =
    catchAsync(async (req: Request, res: Response) => {
        const result = await BookService.getSingleBooks(req.params.id);
        sendResponse<Book>(res, {
            statusCode: httpStatus.OK,
            message: 'Book Retrive Successfully',
            success: true,
            data: result
        })
    });

const updateBook =
    catchAsync(async (req: Request, res: Response) => {
        const result = await BookService.updateBook(req.params.id, req.body);
        sendResponse<Book>(res, {
            statusCode: httpStatus.OK,
            message: 'Book Updated Successfully',
            success: true,
            data: result
        })
    });

const deleteBook =
    catchAsync(async (req: Request, res: Response) => {
        const result = await BookService.deleteBook(req.params.id);
        sendResponse<Category>(res, {
            statusCode: httpStatus.OK,
            message: 'Book Deleted Successfully',
            success: true,
            data: result
        })
    });

export const BookController = {
    createBook,
    getAllBook,
    getSingleBook,
    updateBook,
    deleteBook
}