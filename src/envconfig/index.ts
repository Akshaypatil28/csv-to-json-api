import dotenv from "dotenv";
import path from "path";

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || "development";

const envFound = dotenv.config({ path: path.resolve(__dirname, "../../.env") });

if (!envFound) {
  throw new Error("Couldn't find .env file");
}

module.exports = {
  port: parseInt(process.env.PORT!) || 3000,
  CSV_FILE_PATH: process.env.CSV_FILE_PATH!,
  PG_USER: process.env.PG_USER!,
  PG_HOST: process.env.PG_HOST!,
  PG_DATABASE: process.env.PG_DATABASE!,
  PG_PASSWORD: process.env.PG_PASSWORD!,
  PG_PORT: parseInt(process.env.PG_PORT!) || 5432,
};
