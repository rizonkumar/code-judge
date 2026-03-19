import logger from "../config/loggerConfig";
import { BadRequestError, NotFoundError } from "../errors";
import Problem, { IProblem } from "../models/problem.model";

class ProblemRepository {
  async createProblem(problemData: Partial<IProblem>): Promise<IProblem> {
    try {
      logger.info("Creating new problem in repository");
      const newProblem = await Problem.create(problemData);
      logger.info("New problem created successfully in repository", {
        problemId: newProblem._id,
      });
      return newProblem;
    } catch (error: unknown) {
      logger.error("Error creating problem in repository", {
        error: error instanceof Error ? error.message : error,
      });
      if (error instanceof Error && error.name === "ValidationError") {
        throw new BadRequestError("Invalid problem data", error);
      }
      throw error;
    }
  }

  async getAllProblems(): Promise<IProblem[]> {
    logger.info("Fetching all problems from repository");
    const problemList = await Problem.find({});
    logger.info("All problems fetched successfully from repository", {
      count: problemList.length,
    });
    return problemList;
  }

  async getProblem(id: string): Promise<IProblem> {
    logger.info("Fetching problem from repository", { problemId: id });
    const retrievedProblem = await Problem.findById(id);
    if (!retrievedProblem) {
      logger.warn("Problem not found in repository", { problemId: id });
      throw new NotFoundError("Problem", id);
    }
    logger.info("Problem fetched successfully from repository", {
      problemId: id,
    });
    return retrievedProblem;
  }

  async deleteProblem(id: string): Promise<IProblem> {
    logger.info("Deleting problem from repository", { problemId: id });
    const deletedProblem = await Problem.findByIdAndDelete(id);
    if (!deletedProblem) {
      logger.warn("Problem not found for deletion in repository", {
        problemId: id,
      });
      throw new NotFoundError("Problem", id);
    }
    logger.info("Problem deleted successfully from repository", {
      problemId: id,
    });
    return deletedProblem;
  }

  async updateProblem(
    id: string,
    problemData: Partial<IProblem>
  ): Promise<IProblem> {
    logger.info("Updating problem in repository", { problemId: id });
    const updatedProblem = await Problem.findByIdAndUpdate(id, problemData, {
      new: true,
      runValidators: true,
    });
    if (!updatedProblem) {
      logger.warn("Problem not found for update in repository", {
        problemId: id,
      });
      throw new NotFoundError("Problem", id);
    }
    logger.info("Problem updated successfully in repository", {
      problemId: id,
    });
    return updatedProblem;
  }
}

export default ProblemRepository;
