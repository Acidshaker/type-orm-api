import { Router } from "express";
import { registerAuthModule } from "./Auth";

const router = Router();

export function registerRoutes(app: import("express").Application) {
  registerAuthModule(router);
  app.use("/api", router);     
}
