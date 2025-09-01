import { Router } from "express";
import { AuthController } from "../controllers/Auth.controller";
import { AuthService } from "../services/Auth.service";           
import { AppDataSource } from "@core/config/database";           
import { authenticateToken } from "@shared/middlewares/auth.middleware"; 
import { authorizeRoles } from "@shared/middlewares/authorizeRoles";



import { User } from "../models/User.entity";

export function registerAuthRoutes(router: Router) {
  const userRepository = AppDataSource.getRepository(User);
  const authService = new AuthService();
  const controller = new AuthController(authService);

  router.post("/auth/register", controller.register.bind(controller));
  router.post("/auth/login", controller.login.bind(controller));
  router.post("/auth/refresh", controller.refresh.bind(controller));
  router.post("/auth/logout", controller.logout.bind(controller));

  //SOLO ADMIN PUEDE CREAR OTROS ADMINS
    router.post(
      "/auth/create-admin",
      authenticateToken,
      authorizeRoles("admin"),
      controller.createAdmin.bind(controller)
    );
  }
