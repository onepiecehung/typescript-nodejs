import MangaModel from "../models/manga.model";
import { Schema } from "mongoose";

export async function save(mangaInfo: any) {
    return mangaInfo.save();
}

/**
 *
 * @param {Object} mangaInfo
 */
export async function create(mangaInfo: any) {
    const mangaClass = new MangaModel(mangaInfo);
    return mangaClass.save();
}
