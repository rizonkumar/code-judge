import { Router } from "express";

import {
  getProfile,
  login,
  logout,
  register,
} from "../../controllers/auth.controller";
import verifyToken from "../../middleware/verifyToken";

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.get("/profile", verifyToken, getProfile);

export default authRouter;
