import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Socket } from "socket.io";

import { PRIVATE_KEY_ACCESS, PRIVATE_KEY_REFRESH } from "@config/jwt.config";
import Redis from "@connector/redis";
import { logger } from "@core/log/logger.mixed";
import { responseError } from "@core/response/response.json";
import { IUser } from "@interfaces/user.interface";
import { AUTH } from "@messages/errors/jwt.error.message";
import UserRepository from "@repository/user.repository";

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

export async function Authentication(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const token: string | null = getToken(req.headers);

        if (token) {
            const JWT: any = jwt.verify(token, PRIVATE_KEY_ACCESS);

            const accessTokenKey: string = `AToken_UserId_${JWT?._id}_uuid_${JWT?.uuid}`;
            const accessTokenValue: string = await Redis.getJson(
                accessTokenKey
            );
            if (!accessTokenValue) {
                throw new Error(AUTH.TOKEN_EXPIRED_OR_IS_UNAVAILABLE);
            }

            const myKey: string = `UserInfo_${JWT?._id}`;
            let user: IUser | null = await Redis.getJson(myKey);

            if (!user) {
                user = await UserRepository.findById(JWT?._id);
                await Redis.setJson(myKey, user?.toJSON(), 90);
            } else delete user?.password;

            if (user) {
                Object.assign(res.locals, { user: user }, { token: JWT });
            } else {
                throw new Error(AUTH.TOKEN_EXPIRED_OR_IS_UNAVAILABLE);
            }

            return next();
        }

        return responseError(
            req,
            res,
            AUTH.TOKEN_EXPIRED_OR_IS_UNAVAILABLE,
            401
        );
    } catch (error) {
        logger.error(error);
        return responseError(req, res, error, 401);
    }
}

export async function AuthorizationRefreshToken(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const token: string | null = getToken(req.headers);

        if (token) {
            const JWT: any = jwt.verify(token, PRIVATE_KEY_REFRESH);

            if (JWT) {
                Object.assign(res.locals, { user: JWT });
            } else {
                throw new Error(AUTH.TOKEN_EXPIRED_OR_IS_UNAVAILABLE);
            }

            return next();
        }

        return responseError(
            req,
            res,
            AUTH.TOKEN_EXPIRED_OR_IS_UNAVAILABLE,
            401
        );
    } catch (error) {
        logger.error(error);
        return responseError(req, res, error, 401);
    }
}

export async function AuthenticationWebSocket(
    socket: Socket | any,
    next?: any
) {
    try {
        const token: string | null = socket.handshake.auth.token;
        if (token) {
            const JWT: any = jwt.verify(token, PRIVATE_KEY_ACCESS);

            const accessTokenKey: string = `AToken_UserId_${JWT?._id}_uuid_${JWT?.uuid}`;
            const accessTokenValue: string = await Redis.getJson(
                accessTokenKey
            );
            if (!accessTokenValue) {
                throw new Error(AUTH.TOKEN_EXPIRED_OR_IS_UNAVAILABLE);
            }

            const myKey: string = `UserInfo_${JWT?._id}`;
            const userRedis: IUser | null = await Redis.getJson(myKey);

            if (!userRedis) {
                const user = await UserRepository.findById(JWT?._id);

                if (!user) {
                    throw new Error(AUTH.TOKEN_EXPIRED_OR_IS_UNAVAILABLE);
                }

                await Redis.setJson(myKey, user?.toJSON(), 90);

                Object.assign(socket.handshake, { user: user }, { token: JWT });
            } else
                Object.assign(
                    socket.handshake,
                    { user: userRedis },
                    { token: JWT }
                );
            // console.log(socket.handshake?.user, socket.handshake?.token);
            return next();
        }

        throw new Error(AUTH.TOKEN_EXPIRED_OR_IS_UNAVAILABLE);
    } catch (error) {
        throw new Error(error);
    }
}
