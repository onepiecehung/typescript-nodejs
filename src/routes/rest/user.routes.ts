import { Request, Response, Router } from "express";

import {
    LoginValidator,
    RegisterValidator,
} from "../../validator/user.validation";

const router: Router = Router();

router.route("/test").get(function (req: Request, res: Response) {
    res.send("hello");
});

router.route("/login").post(LoginValidator);

router.route("/register").post(RegisterValidator);

export default router;
