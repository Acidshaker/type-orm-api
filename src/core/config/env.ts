import { config } from "dotenv-flow";
import { z } from "zod";

// Cargar las variables según NODE_ENV automáticamente
config();

const envSchema = z.object({
  PORT: z.string(),
  NODE_ENV: z.enum(["development", "production"]),
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string(),
  ALLOWED_ORIGINS: z.string(),
  AWS_ACCESS_KEY_ID: z.string(),
  AWS_SECRET_ACCESS_KEY: z.string(),
  AWS_REGION: z.string(),
  AWS_BUCKET_NAME: z.string(),
});

export const env = envSchema.parse(process.env);

export const DEFAULT_TIME_ZONE = process.env.TIME_ZONE || "America/Merida";
