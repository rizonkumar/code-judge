import { Router } from "express";

import {
  getJobStatus,
  submitCode,
} from "../../controllers/evaluator.controller";

const evaluatorRouter = Router();

evaluatorRouter.post("/submit", submitCode);
evaluatorRouter.get("/status/:jobId", getJobStatus);

export default evaluatorRouter;
