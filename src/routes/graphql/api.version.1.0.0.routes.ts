import { Request, Response, Router } from 'express';

import { messageWelcome } from '../../config/message.config';
import { randomNumberBothIncluded } from '../../utils/math/function.math';
import { responseSuccess } from '../../core/response/response.json';

const router: Router = Router();

router.all("/v1", function (req: Request, res: Response) {
    return responseSuccess(res, {
        message: messageWelcome[randomNumberBothIncluded(0, messageWelcome.length - 1)]
    });
});


export default router;