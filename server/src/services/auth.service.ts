import logger from "../config/loggerConfig";
import { BadRequestError, UnauthorizedError } from "../errors";
import UserRepository from "../repositories/user.repository";
import { generateAccessToken } from "../utils/jwt";

class AuthService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async register(userData: {
    username: string;
    email: string;
    password: string;
  }) {
    logger.info("Registering new user in service");

    if (!userData.username || !userData.email || !userData.password) {
      throw new BadRequestError(
        "username, email, and password are required",
        {}
      );
    }

    const user = await this.userRepository.createUser(userData);

    const accessToken = generateAccessToken({
      userId: String(user._id),
      email: user.email,
    });

    logger.info("User registered successfully", { userId: user._id });

    return {
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      accessToken,
    };
  }

  async login(credentials: { email: string; password: string }) {
    logger.info("User login attempt in service");

    if (!credentials.email || !credentials.password) {
      throw new BadRequestError("email and password are required", {});
    }

    const user = await this.userRepository.findByEmail(credentials.email);

    if (!user) {
      throw new UnauthorizedError("login", {
        message: "Invalid email or password",
      });
    }

    const isPasswordValid = await user.comparePassword(credentials.password);

    if (!isPasswordValid) {
      throw new UnauthorizedError("login", {
        message: "Invalid email or password",
      });
    }

    const accessToken = generateAccessToken({
      userId: String(user._id),
      email: user.email,
    });

    logger.info("User logged in successfully", { userId: user._id });

    return {
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      accessToken,
    };
  }

  async getProfile(userId: string) {
    const user = await this.userRepository.findById(userId);
    return {
      id: user._id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
    };
  }
}

export default AuthService;
