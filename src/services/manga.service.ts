import { JOB_NAME } from "../config/rabbit.config";
import RABBIT from "../connector/rabbitmq/init/index";
import * as Redis from "../connector/redis/index";
import { logger } from "../core/log/logger.mixed";
import { IManga } from "../interfaces/manga.interface";
import { IUser } from "../interfaces/user.interface";
import * as MangaRepository from "../repository/manga.repository";

export async function create(mangaInfo: IManga, locals: any) {
    try {
        const userInfo: IUser = locals?.user;

        mangaInfo.createdBy = userInfo._id;
        mangaInfo.updatedBy = userInfo._id;

        let mangaData: any = await MangaRepository.create(mangaInfo);

        return Promise.resolve(mangaData);
    } catch (error) {
        logger.error(error);
        return Promise.reject(error);
    }
}
