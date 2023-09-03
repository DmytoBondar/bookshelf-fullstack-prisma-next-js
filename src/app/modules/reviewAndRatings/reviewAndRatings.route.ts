import express from 'express';
import { ReviewAndRatingController } from './reviewAndRatings.contoller';

const router = express.Router();

router.patch('/:id', ReviewAndRatingController.updateReviewAndRatings);
router.post('/create-review', ReviewAndRatingController.createReviewAndRatings);
router.get('/:id', ReviewAndRatingController.getSingleReviewAndRatings);
router.get('/', ReviewAndRatingController.getAllReviewAndRatings);
router.delete('/:id', ReviewAndRatingController.deleteReviewAndRatings);

export const ReviewAndRatingRouter = router;