import { sign } from "jsonwebtoken";

import {
    PRIVATE_KEY_ACCESS,
    PRIVATE_KEY_REFRESH,
} from "../../config/jwt.config";
import { logger } from "../../core/log/logger.mixed";
import { MESSAGE_CODE, MESSAGE_TEXT } from "../../messages/message.response";

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
        throw new Error(MESSAGE_TEXT[MESSAGE_CODE.JWT_GENERATE_ERROR]);
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
        logger.error(error);
        throw new Error(MESSAGE_TEXT[MESSAGE_CODE.JWT_GENERATE_ERROR]);
    }
}
