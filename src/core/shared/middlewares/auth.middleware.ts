import { Request, Response, NextFunction } from "express";
import { verifyToken } from "@shared/utils/jwt";  // antes ../../../core/shared/utils/jwt

export interface AuthRequest extends Request {
  user?: any;
}

export function authenticateToken(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: "Token requerido" });
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded; // guardar payload en req.user
    next();
  } catch {
    return res.status(403).json({ message: "Token inválido" });
  }
}
