import jwt from "jsonwebtoken";

import serverConfig from "../config/serverConfig";

export interface TokenPayload {
  userId: string;
  email: string;
}

export function generateAccessToken(payload: TokenPayload): string {
  return jwt.sign(payload, serverConfig.JWT_SECRET, {
    expiresIn: serverConfig.JWT_EXPIRES_IN,
  } as jwt.SignOptions);
}

export function verifyAccessToken(token: string): TokenPayload {
  return jwt.verify(token, serverConfig.JWT_SECRET) as TokenPayload;
}
