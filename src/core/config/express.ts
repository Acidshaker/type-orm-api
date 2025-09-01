import express from "express";
import cors from "cors";
import { env } from "./env";

/**
 * Crea y configura una instancia de servidor Express.
 *
 * Configuración incluida:
 * - `express.json()`: Habilita el parseo automático de JSON en el body de las solicitudes.
 * - `cors`: Configura los orígenes permitidos para solicitudes CORS usando `env.ALLOWED_ORIGINS`.
 *
 * @returns {import("express").Express} Instancia configurada de Express lista para usarse.
 */

export function createServer() {
  const app = express();

  app.use(express.json());

  app.use(
    cors({
      origin: env.ALLOWED_ORIGINS.split(","),
    })
  );

  return app;
}
