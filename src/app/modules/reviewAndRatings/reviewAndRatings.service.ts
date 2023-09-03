import { ReviewAndRating } from "@prisma/client"
import prisma from "../../../shared/prisma"

const createReviewAndRatings = async (payload: ReviewAndRating): Promise<ReviewAndRating> => {
    const result = await prisma.reviewAndRating.create({
        data: payload,
        include: {
            user: true,
            book: true,
        }
    })
    return result;
};

const getAllReviewAndRatings = async (): Promise<ReviewAndRating[] | null> => {
    const result = await prisma.reviewAndRating.findMany({
        include: {
            user: true,
            book: true,
        }
    });
    return result
}

const getSingleReviewAndRatings = async (id: string): Promise<ReviewAndRating | null> => {
    const result = await prisma.reviewAndRating.findUnique({
        where: {
            id
        },
        include: {
            user: true,
            book: true,
        }
    });
    return result
}

const deleteReviewAndRatings = async (id: string): Promise<ReviewAndRating | null> => {
    const result = await prisma.reviewAndRating.delete({
        where: {
            id
        }
    });
    return result
}

const updateReviewAndRatings = async (id: string, payload: Partial<ReviewAndRating>): Promise<ReviewAndRating | null> => {
    const result = await prisma.reviewAndRating.update({
        where: {
            id
        },
        include: {
            user: true,
            book: true,
        },
        data: payload
    });
    return result
}

export const ReviewAndRatingsService = {
    createReviewAndRatings,
    getAllReviewAndRatings,
    getSingleReviewAndRatings,
    updateReviewAndRatings,
    deleteReviewAndRatings
}