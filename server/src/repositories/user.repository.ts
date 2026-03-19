import logger from "../config/loggerConfig";
import { BadRequestError, NotFoundError } from "../errors";
import User, { IUser } from "../models/user.model";

class UserRepository {
  async createUser(userData: {
    username: string;
    email: string;
    password: string;
  }): Promise<IUser> {
    try {
      logger.info("Creating new user in repository");
      const user = await User.create(userData);
      logger.info("User created successfully", { userId: user._id });
      return user;
    } catch (error: unknown) {
      logger.error("Error creating user in repository", {
        error: error instanceof Error ? error.message : error,
      });
      if (
        error instanceof Error &&
        "code" in error &&
        (error as { code: number }).code === 11000
      ) {
        throw new BadRequestError(
          "User with this email or username already exists",
          error
        );
      }
      if (error instanceof Error && error.name === "ValidationError") {
        throw new BadRequestError("Invalid user data", error);
      }
      throw error;
    }
  }

  async findByEmail(email: string): Promise<IUser | null> {
    logger.info("Finding user by email in repository");
    return User.findOne({ email }).select("+password");
  }

  async findById(id: string): Promise<IUser> {
    logger.info("Finding user by id in repository", { userId: id });
    const user = await User.findById(id);
    if (!user) {
      throw new NotFoundError("User", id);
    }
    return user;
  }
}

export default UserRepository;
