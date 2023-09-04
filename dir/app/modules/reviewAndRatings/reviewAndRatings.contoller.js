"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewAndRatingController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const reviewAndRatings_service_1 = require("./reviewAndRatings.service");
const createReviewAndRatings = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield reviewAndRatings_service_1.ReviewAndRatingsService.createReviewAndRatings(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        message: 'Review&Ratings Created Successfully',
        success: true,
        data: result
    });
}));
const getAllReviewAndRatings = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield reviewAndRatings_service_1.ReviewAndRatingsService.getAllReviewAndRatings();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        message: 'Review&Ratings Retrives Successfully',
        success: true,
        data: result
    });
}));
const getSingleReviewAndRatings = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield reviewAndRatings_service_1.ReviewAndRatingsService.getSingleReviewAndRatings(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        message: 'Review&Ratings Retrive Successfully',
        success: true,
        data: result
    });
}));
const updateReviewAndRatings = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield reviewAndRatings_service_1.ReviewAndRatingsService.updateReviewAndRatings(req.params.id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        message: 'Review&Ratings Updated Successfully',
        success: true,
        data: result
    });
}));
const deleteReviewAndRatings = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield reviewAndRatings_service_1.ReviewAndRatingsService.deleteReviewAndRatings(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        message: 'Review&Ratings Deleted Successfully',
        success: true,
        data: result
    });
}));
exports.ReviewAndRatingController = {
    createReviewAndRatings,
    getAllReviewAndRatings,
    getSingleReviewAndRatings,
    updateReviewAndRatings,
    deleteReviewAndRatings
};
