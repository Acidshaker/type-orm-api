import { createServer } from "./core/config/express";
import { bootstrap } from "./core/bootstrap";

/**
 * Punto de entrada principal de la aplicación.
 *
 * - Crea la instancia del servidor Express con `createServer`.
 * - Llama a `bootstrap` para inicializar la base de datos, registrar rutas y middlewares.
 * - Exporta la instancia de la aplicación para usarla en otros lugares
 */

const app = createServer();
bootstrap(app);

export default app;