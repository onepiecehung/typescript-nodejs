import { Request, Response, Router } from 'express';

import { messageWelcome } from '../../../config/message.config';
import { randomNumberBothIncluded } from '../../../utils/math/function.math';
import { responseSuccess } from '../../../utils/response/response.json';
import V1 from './api.branching.routes';

const router: Router = Router();

router.use("/v1", V1);

router.all("/v1", function (req: Request, res: Response) {
    return responseSuccess(res, {
        message: messageWelcome[randomNumberBothIncluded(0, messageWelcome.length - 1)]
    });
});


export default router;