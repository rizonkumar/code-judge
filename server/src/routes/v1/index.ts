import { Router } from "express";

import verifyToken from "../../middleware/verifyToken";
import authRouter from "./auth.routes";
import evaluatorRouter from "./evaluator.routes";
import problemRouter from "./problem.routes";

const v1Router = Router();

// Public routes
v1Router.use("/auth", authRouter);

// Protected routes
v1Router.use("/problems", verifyToken, problemRouter);
v1Router.use("/evaluator", verifyToken, evaluatorRouter);

export default v1Router;
