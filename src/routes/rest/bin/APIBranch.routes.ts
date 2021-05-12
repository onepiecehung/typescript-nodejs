import { Router } from "express";

import UserRouter from "../user.routes";

class APIBranch {
    public router: Router = Router();

    constructor() {
        this.initializeRoutes();
    }
    private initializeRoutes() {
        const { router: _UserRouter } = new UserRouter();
        this.router.use("/users", _UserRouter);
    }
}

export default APIBranch;
