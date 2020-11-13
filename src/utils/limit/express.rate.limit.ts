import rateLimit from 'express-rate-limit';

import app from '../../app';

// app.set('trust proxy', 1);


export const limit5PerHour: any = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour window
    max: 2, // start blocking after 5 requests
    message:
        "Too many accounts created from this IP, please try again after an hour"
});

// export default limit5PerHour;