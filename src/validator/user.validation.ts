import { NextFunction, Request, Response } from "express";
import Joi from "joi";

import { logger } from "../utils/log/logger.mixed";
import { responseError } from "../utils/response/response.json";

const LoginValidationSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).trim(),
    password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .trim()
        .required(),
    email: Joi.string()
        .email()
        .error(() => {
            throw new Error("Invalid email");
        })
        .trim(),
})
    // .xor("username", "email")
    .with("username", "password")
    .with("email", "password");

const RegisterValidationSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).trim().required(),
    password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .trim()
        .required(),
    email: Joi.string().email().trim().required(),
    lastName: Joi.string().trim().allow(""),
    firstName: Joi.string().trim().allow(""),
    gender: Joi.number().min(0).max(2).allow(""),
    birthday: Joi.date().allow(""),
    phoneNumber: Joi.string().trim().allow(""),
})
    .with("username", "password")
    .with("email", "password");

export async function LoginValidator(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        await LoginValidationSchema.validateAsync(req.body);
        next();
    } catch (error) {
        logger.error(error);
        return responseError(req, res, error, 412);
    }
}

export async function RegisterValidator(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        await RegisterValidationSchema.validateAsync(req.body);
        next();
    } catch (error) {
        logger.error(error);
        return responseError(req, res, error, 412);
    }
}
