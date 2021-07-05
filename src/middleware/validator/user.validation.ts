import { NextFunction, Request, Response } from "express";
import Joi from "joi";

import { logger } from "@/core/log/logger.mixed";
import { responseError } from "@core/response/response.json";

class UserValidation {
    private loginSchema;

    private registerSchema;

    private changePasswordSchema;

    constructor() {
        this.loginSchema = Joi.object({
            id: Joi.string().min(3).max(30).trim(),
            password: Joi.string()
                .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
                .trim()
                .required(),
        }).with("id", "password");

        this.registerSchema = Joi.object({
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

        this.changePasswordSchema = Joi.object({
            oldPassword: Joi.string()
                .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
                .trim()
                .required(),
            newPassword: Joi.string()
                .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
                .trim()
                .required(),
        }).with("oldPassword", "newPassword");
    }

    /**
     * LoginValidator
     */
    public login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            await this.loginSchema.validateAsync(req.body);
            next();
        } catch (error) {
            logger.error(error);
            return responseError(req, res, error, 412);
        }
    };

    /**
     * RegisterValidator
     */
    public register = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            await this.registerSchema.validateAsync(req.body);
            next();
        } catch (error) {
            logger.error(error);
            return responseError(req, res, error, 412);
        }
    };

    /**
     * ChangePasswordValidator
     */
    public changePassword = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            await this.changePasswordSchema.validateAsync(req.body);
            next();
        } catch (error) {
            logger.error(error);
            return responseError(req, res, error, 412);
        }
    };
}

export default new UserValidation();
