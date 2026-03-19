const { StatusCodes } = require("http-status-codes");
const { ProblemService } = require("../services");
const { ProblemRepository } = require("../repositories");
const NotFoundError = require("../errors/not_found.error");
const BadRequestError = require("../errors/badrequest.error");
const logger = require("../config/logger.config");

const problemService = new ProblemService(new ProblemRepository());

async function healthCheck(req, res) {
  logger.info("Health check endpoint called");
  res
    .status(StatusCodes.OK)
    .json({ status: "healthy", message: "Problem controller is operational" });
}

async function addProblem(req, res, next) {
  try {
    logger.info("Adding new problem", { problemData: req.body });
    const newProblem = await problemService.createProblem(req.body);
    logger.info("New problem added successfully", {
      problemId: newProblem._id,
    });
    res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Successfully created a new problem",
      data: newProblem,
    });
  } catch (error) {
    logger.error("Error adding new problem", { error: error.message });
    if (error instanceof BadRequestError) {
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Failed to create problem",
        error: error.message,
      });
    } else {
      next(error);
    }
  }
}

async function getProblem(req, res, next) {
  try {
    logger.info("Fetching problem", { problemId: req.params.id });
    const problem = await problemService.getProblem(req.params.id);
    logger.info("Problem fetched successfully", { problemId: req.params.id });
    res.status(StatusCodes.OK).json({
      success: true,
      message: "Successfully fetched problem",
      data: problem,
    });
  } catch (error) {
    logger.error("Error fetching problem", {
      problemId: req.params.id,
      error: error.message,
    });
    if (error instanceof NotFoundError) {
      res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Problem not found",
        error: error.message,
      });
    } else {
      next(error);
    }
  }
}

async function getProblems(req, res, next) {
  try {
    logger.info("Fetching all problems");
    const problems = await problemService.getAllProblems();
    logger.info("All problems fetched successfully", {
      count: problems.length,
    });
    res.status(StatusCodes.OK).json({
      success: true,
      message: "Successfully fetched all problems",
      data: problems,
    });
  } catch (error) {
    logger.error("Error fetching all problems", { error: error.message });
    next(error);
  }
}

async function updateProblem(req, res, next) {
  try {
    logger.info("Updating problem", {
      problemId: req.params.id,
      updateData: req.body,
    });
    const updatedProblem = await problemService.updateProblem(
      req.params.id,
      req.body,
    );
    logger.info("Problem updated successfully", { problemId: req.params.id });
    res.status(StatusCodes.OK).json({
      success: true,
      message: "Successfully updated problem",
      data: updatedProblem,
    });
  } catch (error) {
    logger.error("Error updating problem", {
      problemId: req.params.id,
      error: error.message,
    });
    if (error instanceof NotFoundError) {
      res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Problem not found",
        error: error.message,
      });
    } else if (error instanceof BadRequestError) {
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Failed to update problem",
        error: error.message,
      });
    } else {
      next(error);
    }
  }
}

async function deleteProblem(req, res, next) {
  try {
    logger.info("Deleting problem", { problemId: req.params.id });
    const deletedProblem = await problemService.deleteProblem(req.params.id);
    logger.info("Problem deleted successfully", { problemId: req.params.id });
    res.status(StatusCodes.OK).json({
      success: true,
      message: "Successfully deleted problem",
      data: deletedProblem,
    });
  } catch (error) {
    logger.error("Error deleting problem", {
      problemId: req.params.id,
      error: error.message,
    });
    if (error instanceof NotFoundError) {
      res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Problem not found",
        error: error.message,
      });
    } else {
      next(error);
    }
  }
}

module.exports = {
  addProblem,
  getProblem,
  getProblems,
  deleteProblem,
  updateProblem,
  healthCheck,
};
