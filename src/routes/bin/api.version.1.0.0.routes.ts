import { Router, Request, Response } from 'express';
import { responseSuccess } from "../../utils/response/response.json";
const router: Router = Router();

router.get("/", function (req: Request, res: Response) {
    return responseSuccess(res, { message: "Welcome to our APIs" });
});


export default router;