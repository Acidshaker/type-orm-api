import "reflect-metadata";
import { DataSource } from "typeorm";
import { env } from "./env";
import path from "path";

// Resuelve problemas de rutas en Windows y Linux
const entitiesPath = path.join(__dirname, "../../modules/**/models/*.{js,ts}");
const migrationsPath = path.join(__dirname, "../../modules/**/migrations/*.{js,ts}");
console.log("Database URL:", env.DATABASE_URL);


export const AppDataSource = new DataSource({
  type: "postgres",
  url: env.DATABASE_URL,
  synchronize: false,
  logging: env.NODE_ENV === "development",
  entities: [entitiesPath],
  migrations: [migrationsPath],
  migrationsTableName: "migrations",
  extra: {
    ssl: env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false
  },
  poolSize: 10,
  connectTimeoutMS: 20000,
  maxQueryExecutionTime: 20000
});

export const testConnection = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Database connection established successfully");
    await AppDataSource.destroy();
  } catch (error) {
    console.error("Database connection failed:", error);
    throw error;
  }
};