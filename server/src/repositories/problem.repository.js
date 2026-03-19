const { Problem } = require("../models");
const NotFoundError = require("../errors/not_found.error");
const BadRequestError = require("../errors/badrequest.error");
const logger = require("../config/logger.config");

class ProblemRepository {
  async createProblem(problemData) {
    try {
      logger.info("Creating new problem in repository");
      const newProblem = await Problem.create(problemData);
      logger.info("New problem created successfully in repository", {
        problemId: newProblem._id,
      });
      return newProblem;
    } catch (error) {
      logger.error("Error creating problem in repository", {
        error: error.message,
      });
      if (error.name === "ValidationError") {
        throw new BadRequestError("Invalid problem data", error.errors);
      }
      throw error;
    }
  }

  async getAllProblems() {
    logger.info("Fetching all problems from repository");
    const problemList = await Problem.find({});
    logger.info("All problems fetched successfully from repository", {
      count: problemList.length,
    });
    return problemList;
  }

  async getProblem(id) {
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

  async deleteProblem(id) {
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

  async updateProblem(id, problemData) {
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

module.exports = ProblemRepository;
