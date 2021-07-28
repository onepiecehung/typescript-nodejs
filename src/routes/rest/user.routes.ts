import { Router } from "express";

import UserController from "@controllers/user.controller";
import {
    Authentication,
    AuthorizationRefreshToken,
} from "@middleware/jwt/auth.jwt.middleware";

import UserValidator from "@middleware/validator/user.validation";

class UserRouter {
    public router: Router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router
            .route("/login")
            .post(UserValidator.login, UserController.login);

        this.router
            .route("/register")
            .post(UserValidator.register, UserController.register);

        this.router
            .route("/@me")
            .get(Authentication, UserController.getProfile);

        this.router
            .route("/@me/accessToken")
            .post(AuthorizationRefreshToken, UserController.getAccessToken);

        this.router
            .route("/logout")
            .post(Authentication, UserController.logout);

        this.router
            .route("/@me/password")
            .put(
                UserValidator.changePassword,
                Authentication,
                UserController.changePassword
            );
    }
}

export default UserRouter;
