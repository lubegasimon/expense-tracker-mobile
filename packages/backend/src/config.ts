import dotenv from "dotenv";
dotenv.config({ path: ".env.test" });

export const secret = process.env.SECRET || "secret";
export const dbUrl = process.env.DATABASE_URI || "postgres://";
