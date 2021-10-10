export const MESSAGE_CODE = {
    // TODO: USER
    EMAIL_EXIST: 10001,
    USERNAME_EXIST: 10002,
    USERNAME_NOT_FOUND: 10003,
    EMAIL_NOT_FOUND: 10004,
    PASSWORD_INCORRECT: 10005,
    USER_HAS_BEEN_: 10006,
    USER_LOGIN_FAILED: 10007,
    YOUR_IP_IS_NOT_ALLOWED_TO_GET_ACCESS_TOKEN: 10008,
    YOUR_DEVICE_IS_NOT_ALLOWED_TO_GET_ACCESS_TOKEN: 10009,
    THE_NEW_PASSWORD_CANNOT_BE_THE_SAME_AS_THE_OLD_ONE: 10010,
    YOUR_DEVICE_HAS_BEEN_: 10011,
    USER_HAVE_BEEN_LOGGED_OUT: 10012,
    PASSWORD_HAVE_BEEN_CHANGED: 10013,
    // TODO: JWT
    JWT_GENERATE_ERROR: 10014,
    TOKEN_EXPIRED_OR_IS_UNAVAILABLE: 10015,
    TOKEN_EXPIRED: 10016,
};

export const MESSAGE_TEXT = {
    // TODO: USER
    [MESSAGE_CODE.EMAIL_EXIST]: `This email address is already`,
    [MESSAGE_CODE.USERNAME_EXIST]: `This username is already`,
    [MESSAGE_CODE.USERNAME_NOT_FOUND]: `Username not found`,
    [MESSAGE_CODE.EMAIL_NOT_FOUND]: `Email not found`,
    [MESSAGE_CODE.PASSWORD_INCORRECT]: `Password incorrect`,
    [MESSAGE_CODE.USER_HAS_BEEN_]: `User has been `,
    [MESSAGE_CODE.USER_LOGIN_FAILED]: `User login failed`,
    [MESSAGE_CODE.YOUR_IP_IS_NOT_ALLOWED_TO_GET_ACCESS_TOKEN]: `Your ip is not allowed to get access token`,
    [MESSAGE_CODE.YOUR_DEVICE_IS_NOT_ALLOWED_TO_GET_ACCESS_TOKEN]: `Your device is not allowed to get access token or you've been logged out`,
    [MESSAGE_CODE.YOUR_DEVICE_HAS_BEEN_]: `Your device is not allowed to get access token or you've been logged out`,
    [MESSAGE_CODE.THE_NEW_PASSWORD_CANNOT_BE_THE_SAME_AS_THE_OLD_ONE]:
        "The new password cannot be the same as the old one",
    [MESSAGE_CODE.USER_HAVE_BEEN_LOGGED_OUT]: `You have been logged out`,
    [MESSAGE_CODE.PASSWORD_HAVE_BEEN_CHANGED]: "Password have been changed",
    // TODO: JWT
    [MESSAGE_CODE.JWT_GENERATE_ERROR]:
        process.env.JWT_GENERATE_ERROR || `Can't generate token`,
    [MESSAGE_CODE.TOKEN_EXPIRED_OR_IS_UNAVAILABLE]:
        process.env.TOKEN_EXPIRED_OR_IS_UNAVAILABLE ||
        `Token has expired or is unavailable`,
    [MESSAGE_CODE.TOKEN_EXPIRED]:
        process.env.TOKEN_EXPIRED || `Token has expired`,
};
