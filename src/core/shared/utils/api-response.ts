import { Response } from "express";

export function sendSuccess(res: Response, data: any, status = 200) {
  return res.status(status).json({ success: true, data });
}

export function sendError(res: Response, message: string, status = 500) {
  return res.status(status).json({ success: false, message });
}

export function sendNotFound(res: Response, message = "Recurso no encontrado") {
  return res.status(404).json({ success: false, message });
}

export function sendUnauthorized(res: Response, message = "No autorizado") {
  return res.status(401).json({ success: false, message });
}
