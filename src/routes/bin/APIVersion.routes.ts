import { Request, Response, Router } from "express";

import { messageWelcome } from "../../config/message.config";
import { responseSuccess } from "../../core/response/response.json";
import { apiLimiter } from "../../middleware/limit/rate.limit";
import { randomNumberBothIncluded } from "../../utils/math/function.math";

import APIBranch from "./APIBranch.routes";

class APIVersion {
    public router: Router = Router();
    constructor() {
        this.initializeVersion();
        this.initializeLimiter();
        this.initializeErrorHandling();
    }

    private initializeLimiter() {
        if (process.env.NODE_ENV === `production`) {
            this.router.use(apiLimiter);
        }
    }
    private initializeVersion() {
        const { router: V1 } = new APIBranch();

        this.router.use("/v1", V1);
    }
    private initializeErrorHandling() {
        this.router.all("/v1", (req: Request, res: Response) => {
            return responseSuccess(res, {
                message:
                    messageWelcome[
                        randomNumberBothIncluded(0, messageWelcome.length - 1)
                    ],
            });
        });
    }
}

export default APIVersion;
