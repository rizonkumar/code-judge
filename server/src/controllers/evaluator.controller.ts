import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import logger from "../config/loggerConfig";
import evaluatorQueueProducer from "../producers/evaluatorQueueProducer";
import evaluatorQueue from "../queues/evaluatorQueue";

export async function submitCode(req: Request, res: Response) {
  try {
    const { problemId, code, language } = req.body;

    if (!problemId || !code || !language) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "problemId, code, and language are required",
      });
    }

    const job = await evaluatorQueueProducer({
      problemId,
      code,
      language,
    });

    logger.info("Code submission job created", { jobId: job.id });

    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Code submitted for evaluation",
      data: { jobId: job.id },
    });
  } catch (error) {
    logger.error("Error submitting code", {
      error: error instanceof Error ? error.message : error,
    });
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to submit code for evaluation",
    });
  }
}

export async function getJobStatus(req: Request, res: Response) {
  try {
    const jobId = req.params.jobId as string;

    const job = await evaluatorQueue.getJob(jobId);

    if (!job) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Job not found",
      });
    }

    const state = await job.getState();
    const result = job.returnvalue;
    const failedReason = job.failedReason;

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Job status retrieved",
      data: {
        jobId: job.id,
        status: state,
        result: result || null,
        error: failedReason || null,
      },
    });
  } catch (error) {
    logger.error("Error getting job status", {
      jobId: req.params.jobId,
      error: error instanceof Error ? error.message : error,
    });
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to retrieve job status",
    });
  }
}
