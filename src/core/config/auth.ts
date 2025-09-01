import { env } from "./env";

export const authConfig = {
  jwt: {
    secret: env.JWT_SECRET as string,
    accessExpiresIn: "1d" as const,
    refreshExpiresIn: "7d" as const,  
  },
};
