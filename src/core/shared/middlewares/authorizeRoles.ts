import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth.middleware";

export function authorizeRoles(...allowedRoles: ("admin" | "user")[]) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "No tienes permisos" });
    }
    next();
  };
}
