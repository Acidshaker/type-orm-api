import { config } from "dotenv-flow";
import { z } from "zod";

// Cargar las variables según NODE_ENV automáticamente
config({
  node_env: process.env.NODE_ENV || "development",
  default_node_env: "development",
  silent: process.env.NODE_ENV === "production",
});

const envSchema = z.object({
  PORT: z.string(),
  NODE_ENV: z.enum(["development", "production"]),
  DB_HOST: z.string().min(1),
  DB_PORT: z.coerce.number().int().positive(),
  DB_USER: z.string().min(1),
  DB_PASSWORD: z.string().min(1),
  DB_NAME: z.string().min(1),
  DB_SSL: z.enum(["true", "false"]).transform((v) => v === "true"),
  DB_SSL_CA_PATH: z.string().optional(),
  JWT_SECRET: z.string(),
  ALLOWED_ORIGINS: z.string(),
  AWS_ACCESS_KEY_ID: z.string(),
  AWS_SECRET_ACCESS_KEY: z.string(),
  AWS_REGION: z.string(),
  AWS_BUCKET_NAME: z.string(),
});

export const env = envSchema.parse(process.env);

export const DEFAULT_TIME_ZONE = process.env.TIME_ZONE || "America/Merida";
