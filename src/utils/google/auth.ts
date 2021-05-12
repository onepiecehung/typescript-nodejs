import axios from "axios";
import { logger } from "@core/log/logger.mixed";

class Google {
    token: string | null;
    constructor() {
        this.token = null;
    }

    async authAccessToken(token: string) {
        try {
            const payload = await axios({
                method: "GET",
                baseURL: `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${token}`,
            });
            return payload;
        } catch (error) {
            logger.error(error);
            return error;
        }
    }

    async authIDToken(token: string) {
        try {
            const payload = await axios({
                method: "GET",
                baseURL: `https://oauth2.googleapis.com/tokeninfo?id_token=${token}`,
            });
            return payload;
        } catch (error) {
            logger.error(error);
            return error;
        }
    }
}

export default new Google();
