import { Router, Request, Response } from 'express';

const router: Router = Router();

router.get("/", function (req: Request, res: Response) {
    res.send("Welcome to our API!");
});


export default router;