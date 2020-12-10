import { NextFunction, Request, Response, Router } from "express";
import { v4 } from "public-ip";

import { messageWelcome } from "../../../config/message.config";
import { apiLimiter } from "../../../middleware/limit/rate.limit";
import { logger } from "../../../utils/log/logger.mixed";
import { randomNumberBothIncluded } from "../../../utils/math/function.math";
import { responseSuccess } from "../../../utils/response/response.json";
import V1 from "./api.branching.routes";

const router: Router = Router();

if (process.env.NODE_ENV === `production`) {
    router.use(apiLimiter);
}

router.use(async (req: Request, res: Response, next: NextFunction) => {
    if (process.env.NODE_ENV === "development") {
        logger.log(`Body: `, req.body);
        logger.log(`Query: `, req.query);
        logger.log(`Params: `, req.params);
        logger.log(`IP: `, await v4());
    }
    next();
});

router.use("/v1", V1);

router.all("/v1", function (req: Request, res: Response) {
    return responseSuccess(res, {
        message:
            messageWelcome[
                randomNumberBothIncluded(0, messageWelcome.length - 1)
            ],
    });
});

export default router;
