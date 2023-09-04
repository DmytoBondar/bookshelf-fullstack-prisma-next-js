"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewAndRatingRouter = void 0;
const express_1 = __importDefault(require("express"));
const reviewAndRatings_contoller_1 = require("./reviewAndRatings.contoller");
const router = express_1.default.Router();
router.patch('/:id', reviewAndRatings_contoller_1.ReviewAndRatingController.updateReviewAndRatings);
router.post('/create-review', reviewAndRatings_contoller_1.ReviewAndRatingController.createReviewAndRatings);
router.get('/:id', reviewAndRatings_contoller_1.ReviewAndRatingController.getSingleReviewAndRatings);
router.get('/', reviewAndRatings_contoller_1.ReviewAndRatingController.getAllReviewAndRatings);
router.delete('/:id', reviewAndRatings_contoller_1.ReviewAndRatingController.deleteReviewAndRatings);
exports.ReviewAndRatingRouter = router;
