import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import {
    PRIVATE_KEY_ACCESS,
    PRIVATE_KEY_REFRESH,
} from "../../config/jwt.config";
import * as Redis from "../../connector/redis/index";
import { AUTHORIZATION } from "../../errors/messages/jwt.error.message";
import { IUser, IUserSession } from "../../interfaces/user.interface";
import * as UserRepository from "../../repository/user.repository";
import * as UserSessionRepository from "../../repository/user.session.repository";
import { logger } from "../../utils/log/logger.mixed";
import { responseError } from "../../utils/response/response.json";

export function getToken(headers: any) {
    try {
        if ((headers && headers.authorization) || headers["x-access-token"]) {
            let token = headers.authorization || headers["x-access-token"];
            if (token.startsWith(`TEA `)) {
                token = token.slice(4, token.length);
                return token;
            } else {
                return token;
            }
        }
        return null;
    } catch (error) {
        logger.error(error);
        return null;
    }
}

export async function Authorization(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        let token: string | null = getToken(req.headers);

        if (token) {
            const JWT: any = jwt.verify(token, PRIVATE_KEY_ACCESS);

            let myKey: string = `UserInfo_${JWT._id}`;
            let user: IUser | null = await Redis.getJson(myKey);

            if (!user) {
                user = await UserRepository.findById(JWT._id);
                await Redis.setJson(myKey, user?.toJSON(), 90);
            }

            if (user) {
                Object.assign(res.locals, { user: user });
            } else {
                throw new Error(AUTHORIZATION.TOKEN_EXPIRED_OR_IS_UNAVAILABLE);
            }

            return next();
        }

        return responseError(
            req,
            res,
            AUTHORIZATION.TOKEN_EXPIRED_OR_IS_UNAVAILABLE,
            403
        );
    } catch (error) {
        logger.error(error);
        return responseError(req, res, error, 403);
    }
}

export async function AuthorizationRefreshToken(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        let token: string | null = getToken(req.headers);

        if (token) {
            const JWT: any = jwt.verify(token, PRIVATE_KEY_REFRESH);

            if (JWT) {
                Object.assign(
                    res.locals,
                    { user: JWT },
                    { refreshToken: token }
                );
            } else {
                throw new Error(AUTHORIZATION.TOKEN_EXPIRED_OR_IS_UNAVAILABLE);
            }

            return next();
        }

        return responseError(
            req,
            res,
            AUTHORIZATION.TOKEN_EXPIRED_OR_IS_UNAVAILABLE,
            403
        );
    } catch (error) {
        logger.error(error);
        return responseError(req, res, error, 403);
    }
}
