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

function getEnvVariable(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Environment variable ${name} is required`);
  return value;
}

export const databaseUrl = getEnvVariable("DATABASE_URI");
export const sendGridApiKey = getEnvVariable("SENDGRID_API_KEY");
export const senderEmail = getEnvVariable("SENDER_EMAIL");
export const secret = getEnvVariable("SECRET");
