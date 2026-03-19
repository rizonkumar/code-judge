import { Router } from "express";

import {
  addProblem,
  deleteProblem,
  getProblem,
  getProblems,
  healthCheck,
  updateProblem,
} from "../../controllers/problem.controller";

const problemRouter = Router();

problemRouter.get("/health", healthCheck);
problemRouter.get("/", getProblems);
problemRouter.get("/:id", getProblem);
problemRouter.post("/", addProblem);
problemRouter.patch("/:id", updateProblem);
problemRouter.delete("/:id", deleteProblem);

export default problemRouter;
