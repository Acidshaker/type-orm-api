import "reflect-metadata";
import { DataSource } from "typeorm";
import { env } from "./env";
import path from "path";
import fs from "fs";

// Resuelve problemas de rutas en Windows y Linux
const entitiesPath = path.join(__dirname, "../../modules/**/models/*.{js,ts}");
const migrationsPath = path.join(
  __dirname,
  "../../modules/**/migrations/*.{js,ts}"
);

const sslCertPath = path.resolve(__dirname, "../../../certs/global-bundle.pem");

export const AppDataSource = new DataSource({
  type: "postgres",
  host: env.DB_HOST,
  port: Number(env.DB_PORT),
  username: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  synchronize: false,
  logging: env.NODE_ENV === "development",
  entities: [entitiesPath],
  migrations: [migrationsPath],
  migrationsTableName: "migrations",
  extra: {
    ssl: env.DB_SSL
      ? {
          rejectUnauthorized: false,
        }
      : false,
  },

  poolSize: 10,
  connectTimeoutMS: 20000,
  maxQueryExecutionTime: 20000,
});

export const testConnection = async () => {
  console.log("📄 Certificado RDS cargado:", fs.existsSync(sslCertPath));
  console.log("📄 Ruta del certificado:", sslCertPath);
  try {
    await AppDataSource.initialize();
    console.log("Database connection established successfully");
    await AppDataSource.destroy();
  } catch (error) {
    console.error("Database connection failed:", error);
    throw error;
  }
};
