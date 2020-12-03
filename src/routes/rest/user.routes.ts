import { Router } from "express";

import * as UserController from "../../controllers/user.controller";
import {
    LoginValidator,
    RegisterValidator,
} from "../../validator/user.validation";

const router: Router = Router();

router.route("/login").post(LoginValidator, UserController.login);

router.route("/register").post(RegisterValidator, UserController.register);

export default router;
