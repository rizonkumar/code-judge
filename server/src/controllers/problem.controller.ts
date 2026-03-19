import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import logger from "../config/loggerConfig";
import { BadRequestError, NotFoundError } from "../errors";
import ProblemRepository from "../repositories/problem.repository";
import ProblemService from "../services/problem.service";

const problemService = new ProblemService(new ProblemRepository());

export async function healthCheck(_req: Request, res: Response) {
  logger.info("Health check endpoint called");
  res
    .status(StatusCodes.OK)
    .json({ status: "healthy", message: "Problem controller is operational" });
}

export async function addProblem(
  req: Request,
  res: Response,
  next: NextFunction
) {
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
    logger.error("Error adding new problem", {
      error: error instanceof Error ? error.message : error,
    });
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

export async function getProblem(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    logger.info("Fetching problem", { problemId: (req.params.id as string) });
    const problem = await problemService.getProblem((req.params.id as string));
    logger.info("Problem fetched successfully", { problemId: (req.params.id as string) });
    res.status(StatusCodes.OK).json({
      success: true,
      message: "Successfully fetched problem",
      data: problem,
    });
  } catch (error) {
    logger.error("Error fetching problem", {
      problemId: (req.params.id as string),
      error: error instanceof Error ? error.message : error,
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

export async function getProblems(
  _req: Request,
  res: Response,
  next: NextFunction
) {
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
    logger.error("Error fetching all problems", {
      error: error instanceof Error ? error.message : error,
    });
    next(error);
  }
}

export async function updateProblem(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    logger.info("Updating problem", {
      problemId: (req.params.id as string),
      updateData: req.body,
    });
    const updatedProblem = await problemService.updateProblem(
      (req.params.id as string),
      req.body
    );
    logger.info("Problem updated successfully", { problemId: (req.params.id as string) });
    res.status(StatusCodes.OK).json({
      success: true,
      message: "Successfully updated problem",
      data: updatedProblem,
    });
  } catch (error) {
    logger.error("Error updating problem", {
      problemId: (req.params.id as string),
      error: error instanceof Error ? error.message : error,
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

export async function deleteProblem(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    logger.info("Deleting problem", { problemId: (req.params.id as string) });
    const deletedProblem = await problemService.deleteProblem((req.params.id as string));
    logger.info("Problem deleted successfully", { problemId: (req.params.id as string) });
    res.status(StatusCodes.OK).json({
      success: true,
      message: "Successfully deleted problem",
      data: deletedProblem,
    });
  } catch (error) {
    logger.error("Error deleting problem", {
      problemId: (req.params.id as string),
      error: error instanceof Error ? error.message : error,
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
