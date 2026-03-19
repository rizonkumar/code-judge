import { Router } from "express";

import evaluatorRouter from "./evaluator.routes";
import problemRouter from "./problem.routes";

const v1Router = Router();

v1Router.use("/problems", problemRouter);
v1Router.use("/evaluator", evaluatorRouter);

export default v1Router;
