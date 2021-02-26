import { Router } from "express";

import UserRouter from "../user.routes";
import MangaRouter from "../manga.routes";

const router: Router = Router();

router.use("/users", UserRouter);
router.use("/mangas", MangaRouter);

export default router;
