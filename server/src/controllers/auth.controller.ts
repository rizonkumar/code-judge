import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import logger from "../config/loggerConfig";
import { BadRequestError, UnauthorizedError } from "../errors";
import UserRepository from "../repositories/user.repository";
import AuthService from "../services/auth.service";

const authService = new AuthService(new UserRepository());

export async function register(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    logger.info("Register endpoint called");
    const { username, email, password } = req.body;

    const result = await authService.register({ username, email, password });

    res.cookie("accessToken", result.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(StatusCodes.CREATED).json({
      success: true,
      message: "User registered successfully",
      data: {
        user: result.user,
        accessToken: result.accessToken,
      },
    });
  } catch (error) {
    logger.error("Error in register", {
      error: error instanceof Error ? error.message : error,
    });
    if (error instanceof BadRequestError) {
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: error.message,
      });
    } else {
      next(error);
    }
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    logger.info("Login endpoint called");
    const { email, password } = req.body;

    const result = await authService.login({ email, password });

    res.cookie("accessToken", result.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Login successful",
      data: {
        user: result.user,
        accessToken: result.accessToken,
      },
    });
  } catch (error) {
    logger.error("Error in login", {
      error: error instanceof Error ? error.message : error,
    });
    if (error instanceof UnauthorizedError) {
      res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: "Invalid email or password",
      });
    } else if (error instanceof BadRequestError) {
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: error.message,
      });
    } else {
      next(error);
    }
  }
}

export async function logout(_req: Request, res: Response) {
  res.clearCookie("accessToken");
  res.status(StatusCodes.OK).json({
    success: true,
    message: "Logged out successfully",
  });
}

export async function getProfile(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: "Not authenticated",
      });
    }

    const profile = await authService.getProfile(req.user.userId);

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Profile fetched successfully",
      data: profile,
    });
  } catch (error) {
    logger.error("Error fetching profile", {
      error: error instanceof Error ? error.message : error,
    });
    next(error);
  }
}
