import { Router } from "express";
import { registerAuthRoutes } from "./routes/Auth.routes";

export function registerAuthModule(router: Router) {
  registerAuthRoutes(router);
}
