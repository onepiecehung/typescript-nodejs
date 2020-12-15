export const JWT_MESSAGE = {
    JWT_GENERATE_ERROR:
        process.env.JWT_GENERATE_ERROR || `Can't generate token`,
};

export const AUTH = {
    TOKEN_EXPIRED_OR_IS_UNAVAILABLE:
        process.env.TOKEN_EXPIRED_OR_IS_UNAVAILABLE ||
        `Token has expired or is unavailable`,
    TOKEN_EXPIRED: process.env.TOKEN_EXPIRED || `Token has expired`,
};
