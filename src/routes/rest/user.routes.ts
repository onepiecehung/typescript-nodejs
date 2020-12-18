import { Router } from "express";

import * as UserController from "../../controllers/user.controller";
import {
    Authentication,
    AuthorizationRefreshToken,
} from "../../middleware/jwt/auth.jwt.middleware";

import {
    ChangePasswordValidator,
    LoginValidator,
    RegisterValidator,
} from "../../validator/user.validation";

const router: Router = Router();

router.route("/login").post(LoginValidator, UserController.login);

router.route("/register").post(RegisterValidator, UserController.register);

router.route("/getProfile").get(Authentication, UserController.getProfile);

router
    .route("/getAccessToken")
    .post(AuthorizationRefreshToken, UserController.getAccessToken);

router.route("/logout").post(Authentication, UserController.logout);

router
    .route("/changePassword")
    .put(
        ChangePasswordValidator,
        Authentication,
        UserController.changePassword
    );

export default router;
