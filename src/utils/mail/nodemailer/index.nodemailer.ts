import { createTransport } from "nodemailer";

import { NODEMAILER } from "../../../config/email.config";

import { logger } from "../../../core/log/logger.mixed";

export async function sendMail(
    to: string,
    subject: string,
    html: string | any,
    attachments?: any[]
) {
    try {
        const transporter = createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            requireTLS: true, // true for 465, false for other ports
            auth: {
                user: NODEMAILER.EMAIL,
                pass: NODEMAILER.PASS,
            },
        });

        const options: any = {
            to: to,
            subject: subject,
            html: html,
        };

        if (attachments) {
            Object.assign(options, { attachments: attachments });
        }

        await transporter.sendMail(options, (error: any, info: any) => {
            if (error) {
                logger.error(error);
                return false;
            } else {
                logger.info(`Email sent: `, info.response);
                return true;
            }
        });
        return false;
    } catch (error) {
        logger.error(error);
        return false;
    }
}
