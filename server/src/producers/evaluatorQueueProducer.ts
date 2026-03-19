import { Job } from "bullmq";

import logger from "../config/loggerConfig";
import evaluatorQueue from "../queues/evaluatorQueue";

export interface SubmissionPayload {
  problemId: string;
  code: string;
  language: string;
}

export default async function evaluatorQueueProducer(
  payload: SubmissionPayload
): Promise<Job> {
  const job = await evaluatorQueue.add("EvaluateCode", payload);
  logger.info("Job added to evaluator queue", { jobId: job.id });
  return job;
}
