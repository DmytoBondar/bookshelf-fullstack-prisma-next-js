import { NextFunction, Request, Response } from "express";
import ApiError from "../../errors/apiError";
import httpStatus from "http-status";
import { JWTHelpers } from "../../helpers/jwtHelpers";
import config from "../../config";
import { Secret } from "jsonwebtoken";

const auth = (...authRules: string[]) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers.authorization;
            if (!token) {
                throw new ApiError(httpStatus.NOT_FOUND, 'Token is not Found !!');
            }
            const verfiedToken = JWTHelpers.verfiedToken(token, config.jwt.secret as Secret);

            req.user = verfiedToken;

            if (authRules.length && !authRules.includes(verfiedToken.role)) {
                throw new ApiError(httpStatus.UNAUTHORIZED, 'Not Authorized Please Login !!')
            };
            next();
        } catch (error) {
            next(error);
        }
    };

export default auth;
