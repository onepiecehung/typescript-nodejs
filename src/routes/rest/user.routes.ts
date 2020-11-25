import { Request, Response, Router } from 'express';

const router: Router = Router();

router.route("/test")
    .get(function (req: Request, res: Response) {
        res.send("hello")
    })

export default router;

