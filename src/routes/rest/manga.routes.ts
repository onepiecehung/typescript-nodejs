import { Router } from "express";

import * as MangaController from "../../controllers/manga.controller";
import {
    Authentication,
    AuthorizationRefreshToken,
} from "../../middleware/jwt/auth.jwt.middleware";

import {
    CreateMangaValidator,
    UpdateMangaValidator,
} from "../../validator/manga.validation";

const router: Router = Router();

router
    .route("/create")
    .post(CreateMangaValidator, Authentication, MangaController.create);
router
    .route("/update")
    .put(UpdateMangaValidator, Authentication, MangaController.update);

export default router;
