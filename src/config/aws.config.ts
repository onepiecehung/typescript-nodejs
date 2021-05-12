export const AWS_C = {
    REGION: process.env.AWS_REGION,
    ACCELERATED_ENDPOINT: process.env.AWS_ACCELERATED_ENDPOINT || "",
    EXPIRED_TIME: process.env.AWS_EXPIRED_TIME || 10 * 60,
    UPLOAD_FOLDER: process.env.AWS_UPLOAD_FOLDER,
    ACL: process.env.AWS_ACL || "public-read",
    BUCKET: process.env.AWS_BUCKET || "",
    KEY: process.env.AWS_KEY || "",
    ACCESS_KEY: process.env.AWS_ACCESS_KEY || "",
    SECRET_KEY: process.env.AWS_SECRET_KEY || "",
    CLOUDFRONT_URL: process.env.AWS_CLOUDFRONT_URL,
};
