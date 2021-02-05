import { sign } from "jsonwebtoken";

import {
    PRIVATE_KEY_ACCESS,
    PRIVATE_KEY_REFRESH,
} from "../../config/jwt.config";
import { JWT_MESSAGE } from "../../messages/errors/jwt.error.message";
import { logger } from "../log/logger.mixed";
/**
 *
 * @param payload
 * @param expiresIn
 */
export async function generateAccessToken(
    payload: string | Object | Buffer,
    expiresIn: number | string = "1h"
) {
    try {
        return sign(payload, PRIVATE_KEY_ACCESS, {
            expiresIn: expiresIn,
            algorithm: "HS512",
        });
    } catch (error) {
        logger.error(error);
        throw new Error(JWT_MESSAGE.JWT_GENERATE_ERROR);
    }
}

/**
 *
 * @param payload
 * @param expiresIn
 */
export async function generateRefreshToken(
    payload: string | Object | Buffer,
    expiresIn: number | string = "365d"
) {
    try {
        return sign(payload, PRIVATE_KEY_REFRESH, {
            expiresIn: expiresIn,
            algorithm: "HS384",
        });
    } catch (error) {
        throw new Error(JWT_MESSAGE.JWT_GENERATE_ERROR);
    }
}
