const express = require("express");
const { problemController } = require("../../controllers");

const problemRouter = express.Router();

problemRouter.get("/health", problemController.healthCheck);
problemRouter.get("/", problemController.getProblems);
problemRouter.get("/:id", problemController.getProblem);
problemRouter.post("/", problemController.addProblem);
problemRouter.patch("/:id", problemController.updateProblem);
problemRouter.delete("/:id", problemController.deleteProblem);

module.exports = problemRouter;
