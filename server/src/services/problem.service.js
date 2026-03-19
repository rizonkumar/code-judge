const cleanAndSanitizeMarkdown = require("../utils/markdownSanitizer");
const NotFoundError = require("../errors/not_found.error");
const logger = require("../config/logger.config");

class ProblemService {
  constructor(problemRepository) {
    this.problemRepository = problemRepository;
  }

  async createProblem(problemData) {
    logger.info("Creating new problem in service");
    problemData.description = cleanAndSanitizeMarkdown(problemData.description);
    const newProblem = await this.problemRepository.createProblem(problemData);
    logger.info("New problem created successfully in service", {
      problemId: newProblem._id,
    });
    return newProblem;
  }

  async getAllProblems() {
    logger.info("Fetching all problems in service");
    const problems = await this.problemRepository.getAllProblems();
    logger.info("All problems fetched successfully in service", {
      count: problems.length,
    });
    return problems;
  }

  async getProblem(problemId) {
    logger.info("Fetching problem in service", { problemId });
    const retrievedProblem = await this.problemRepository.getProblem(problemId);
    if (!retrievedProblem) {
      logger.warn("Problem not found in service", { problemId });
      throw new NotFoundError("Problem", problemId);
    }
    logger.info("Problem fetched successfully in service", { problemId });
    return retrievedProblem;
  }

  async deleteProblem(problemId) {
    logger.info("Deleting problem in service", { problemId });
    const deletedProblem =
      await this.problemRepository.deleteProblem(problemId);
    if (!deletedProblem) {
      logger.warn("Problem not found for deletion in service", { problemId });
      throw new NotFoundError("Problem", problemId);
    }
    logger.info("Problem deleted successfully in service", { problemId });
    return deletedProblem;
  }

  async updateProblem(problemId, problemData) {
    logger.info("Updating problem in service", { problemId });
    if (problemData.description) {
      problemData.description = cleanAndSanitizeMarkdown(
        problemData.description,
      );
    }
    const updatedProblem = await this.problemRepository.updateProblem(
      problemId,
      problemData,
    );
    if (!updatedProblem) {
      logger.warn("Problem not found for update in service", { problemId });
      throw new NotFoundError("Problem", problemId);
    }
    logger.info("Problem updated successfully in service", { problemId });
    return updatedProblem;
  }
}

module.exports = ProblemService;
