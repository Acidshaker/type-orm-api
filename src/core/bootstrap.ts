import { registerRoutes } from "../modules";
import { errorHandler } from "./shared/middlewares/error-handler";
import { Application } from "express";
import { AppDataSource } from "./config/database";
import { env } from "./config/env";

/**
 * Inicializa y arranca la aplicación.
 *
 * Pasos principales:
 * 1. **Base de datos**: Inicializa la conexión a la base de datos mediante TypeORM.
 *    - Si falla la conexión, se muestra el error en consola y se termina el proceso.
 *    - Si está en entorno de desarrollo, muestra un log adicional.
 *
 * 2. **Rutas**: Registra todas las rutas de la aplicación usando `registerRoutes`.
 *
 * 3. **Middlewares**: 
 *    - `errorHandler`: Manejo centralizado de errores para capturar excepciones
 *      y devolver respuestas consistentes al cliente.
 */

export async function bootstrap(app: Application) {
  try {
    await AppDataSource.initialize();
    if (env.NODE_ENV === "development") {
      console.log("Database connected (development mode)");
    }
  } catch (err) {
    console.error("Database connection error:", err);
    process.exit(1);
  }

  registerRoutes(app);
  app.use(errorHandler);
}
