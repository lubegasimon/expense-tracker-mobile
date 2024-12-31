import dotenv from "dotenv";

type environment = "development" | "test" | "production";
const Environment = process.env.NODE_ENV as environment;
const envFile = () => {
  if (Environment === "test") return ".env.test";
  else if (Environment === "production") return ".env.production";
  else return ".env";
};

dotenv.config({ path: envFile() });

export const safeEnvironment = (): environment => {
  if (Environment === "development" || "test" || Environment === "production")
    return Environment;
  return "development";
};

export const secret = process.env.SECRET || "secret";
export const dbUrl = process.env.DATABASE_URI || "postgres://";
