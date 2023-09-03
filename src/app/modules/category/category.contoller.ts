import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { CategoryService } from "./category.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { Category } from "@prisma/client";

const createCategory =
    catchAsync(async (req: Request, res: Response) => {
        const result =await CategoryService.createCategory(req.body);
        
        sendResponse<Category>(res, {
            statusCode: httpStatus.OK,
            message: 'Category Created Successfully',
            success: true,
            data: result
        })
    });

const getAllCategories =
    catchAsync(async (req: Request, res: Response) => {
        const result = await CategoryService.getAllCategories();
        sendResponse(res, {
            statusCode: httpStatus.OK,
            message: 'Categories Retrives Successfully',
            success: true,
            data: result
        })
    });

const getSingleCategories =
    catchAsync(async (req: Request, res: Response) => {
        const result = await CategoryService.getSingleCategories(req.params.id);
        sendResponse(res, {
            statusCode: httpStatus.OK,
            message: 'Categories Retrives Successfully',
            success: true,
            data: result
        })
    });

const updateCategory =
    catchAsync(async (req: Request, res: Response) => {
        const result = await CategoryService.updateCategories(req.params.id, req.body);
        sendResponse<Category>(res, {
            statusCode: httpStatus.OK,
            message: 'Categories Updated Successfully',
            success: true,
            data: result
        })
    });

const deleteCategory =
    catchAsync(async (req: Request, res: Response) => {
        const result = await CategoryService.deleteCategories(req.params.id);
        sendResponse<Category>(res, {
            statusCode: httpStatus.OK,
            message: 'Categories Deleted Successfully',
            success: true,
            data: result
        })
    });

export const CategoryController = {
    createCategory,
    getAllCategories,
    getSingleCategories,
    updateCategory,
    deleteCategory
}