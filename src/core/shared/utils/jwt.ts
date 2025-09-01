import jwt, { SignOptions } from "jsonwebtoken";
import { authConfig } from "@core/config/auth";


export function generateAccessToken(payload: object) {
  return jwt.sign(payload, authConfig.jwt.secret, {
    expiresIn: authConfig.jwt.accessExpiresIn,
  } as SignOptions);
}

export function generateRefreshToken(payload: object) {
  return jwt.sign(payload, authConfig.jwt.secret, {
    expiresIn: authConfig.jwt.refreshExpiresIn,
  } as SignOptions);
}

export function verifyToken(token: string) {
  return jwt.verify(token, authConfig.jwt.secret);
}
