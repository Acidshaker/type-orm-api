require("module-alias/register");
import app from "./app";
import { env } from "./core/config/env";

app.listen(env.PORT, () => {
  console.log(
    `Server running at http://localhost:${env.PORT} [${env.NODE_ENV}]
    ${env.DB_HOST}:${env.DB_PORT}/${env.DB_NAME}`
  );
});
