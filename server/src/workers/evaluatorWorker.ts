import { Job, Worker } from "bullmq";

import redisConnection from "../config/redisConfig";
import logger from "../config/loggerConfig";
import Problem from "../models/problem.model";
import createContainer from "../container/containerFactory";
import { PYTHON_IMAGE } from "../utils/constants";

interface TestCaseResult {
  testCase: number;
  input: string;
  expectedOutput: string;
  actualOutput: string;
  passed: boolean;
  error?: string;
}

interface EvaluationResult {
  totalTests: number;
  passed: number;
  failed: number;
  results: TestCaseResult[];
}

async function runCodeInDocker(
  code: string,
  input: string,
  _language: string
): Promise<{ output: string; error: string }> {
  try {
    const fullCode = `
import sys
from io import StringIO
sys.stdin = StringIO(${JSON.stringify(input)})
${code}
`;

    const container = await createContainer(PYTHON_IMAGE, [
      "python3",
      "-c",
      fullCode,
    ]);

    await container.start();

    const logStream = await container.logs({
      follow: true,
      stdout: true,
      stderr: true,
    });

    return new Promise((resolve) => {
      let output = "";
      let error = "";

      logStream.on("data", (chunk: Buffer) => {
        const text = chunk.toString("utf8").replace(/^.{8}/gm, "");
        output += text;
      });

      logStream.on("error", (err: Error) => {
        error = err.message;
      });

      logStream.on("end", async () => {
        try {
          await container.stop();
        } catch {
          // container may already be stopped
        }
        try {
          await container.remove();
        } catch {
          // container may already be removed
        }
        resolve({ output: output.trim(), error });
      });

      setTimeout(async () => {
        try {
          await container.kill();
        } catch {
          // ignore
        }
        resolve({ output: "", error: "Time Limit Exceeded (10s)" });
      }, 10000);
    });
  } catch (err) {
    logger.error("Error running code in Docker", { error: err });
    return {
      output: "",
      error: err instanceof Error ? err.message : "Unknown error",
    };
  }
}

export default function startEvaluatorWorker() {
  const worker = new Worker(
    "EvaluatorQueue",
    async (job: Job) => {
      const { problemId, code, language } = job.data;

      logger.info("Processing evaluation job", {
        jobId: job.id,
        problemId,
        language,
      });

      const problem = await Problem.findById(problemId);
      if (!problem) {
        throw new Error(`Problem not found: ${problemId}`);
      }

      const results: TestCaseResult[] = [];
      let passedCount = 0;

      for (let i = 0; i < problem.testCases.length; i++) {
        const testCase = problem.testCases[i];
        const { output, error } = await runCodeInDocker(
          code,
          testCase.input,
          language
        );

        const passed = output === testCase.output.trim();
        if (passed) passedCount++;

        results.push({
          testCase: i + 1,
          input: testCase.input,
          expectedOutput: testCase.output,
          actualOutput: output,
          passed,
          error: error || undefined,
        });
      }

      const evaluation: EvaluationResult = {
        totalTests: problem.testCases.length,
        passed: passedCount,
        failed: problem.testCases.length - passedCount,
        results,
      };

      logger.info("Evaluation completed", {
        jobId: job.id,
        passed: passedCount,
        total: problem.testCases.length,
      });

      return evaluation;
    },
    {
      connection: redisConnection,
      concurrency: 5,
    }
  );

  worker.on("completed", (job) => {
    logger.info(`Job ${job.id} completed successfully`);
  });

  worker.on("failed", (job, err) => {
    logger.error(`Job ${job?.id} failed`, { error: err.message });
  });

  logger.info("Evaluator worker started");
  return worker;
}
