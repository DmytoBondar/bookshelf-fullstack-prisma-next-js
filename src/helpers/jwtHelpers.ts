import jwt, { JwtPayload, Secret } from 'jsonwebtoken';

const createAccessToken = (payload: Record<string, unknown>, secret: Secret, expireTime: string): string => {
    return jwt.sign(payload, secret, { expiresIn: expireTime });
}

const verfiedToken = (token: string, secret: Secret) => {
    return jwt.verify(token, secret) as JwtPayload
}

export const JWTHelpers = {
    createAccessToken,
    verfiedToken
}