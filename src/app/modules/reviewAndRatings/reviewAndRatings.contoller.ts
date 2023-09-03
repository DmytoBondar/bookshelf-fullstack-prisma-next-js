import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { ReviewAndRating } from "@prisma/client";
import { ReviewAndRatingsService } from "./reviewAndRatings.service";

const createReviewAndRatings =
    catchAsync(async (req: Request, res: Response) => {
        const result = await ReviewAndRatingsService.createReviewAndRatings(req.body);
        sendResponse<ReviewAndRating>(res, {
            statusCode: httpStatus.OK,
            message: 'Review&Ratings Created Successfully',
            success: true,
            data: result
        })
    });

const getAllReviewAndRatings =
    catchAsync(async (req: Request, res: Response) => {
        const result = await ReviewAndRatingsService.getAllReviewAndRatings();
        sendResponse<ReviewAndRating[]>(res, {
            statusCode: httpStatus.OK,
            message: 'Review&Ratings Retrives Successfully',
            success: true,
            data: result
        })
    });

const getSingleReviewAndRatings =
    catchAsync(async (req: Request, res: Response) => {
        const result = await ReviewAndRatingsService.getSingleReviewAndRatings(req.params.id);
        sendResponse<ReviewAndRating>(res, {
            statusCode: httpStatus.OK,
            message: 'Review&Ratings Retrive Successfully',
            success: true,
            data: result
        })
    });

const updateReviewAndRatings =
    catchAsync(async (req: Request, res: Response) => {
        const result = await ReviewAndRatingsService.updateReviewAndRatings(req.params.id, req.body);
        sendResponse<ReviewAndRating>(res, {
            statusCode: httpStatus.OK,
            message: 'Review&Ratings Updated Successfully',
            success: true,
            data: result
        })
    });

const deleteReviewAndRatings =
    catchAsync(async (req: Request, res: Response) => {
        const result = await ReviewAndRatingsService.deleteReviewAndRatings(req.params.id);
        sendResponse<ReviewAndRating>(res, {
            statusCode: httpStatus.OK,
            message: 'Review&Ratings Deleted Successfully',
            success: true,
            data: result
        })
    });

export const ReviewAndRatingController = {
    createReviewAndRatings,
    getAllReviewAndRatings,
    getSingleReviewAndRatings,
    updateReviewAndRatings,
    deleteReviewAndRatings
}