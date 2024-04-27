import dotenv from "dotenv";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

export const Environment = {
  NODE_ENV: process.env.NODE_ENV!,
  PORT: process.env.PORT!,
  DB_NAME: process.env.DB_NAME!,
  DB_USER_ROOT: process.env.DB_USER_ROOT!,
  DB_PASSWORD: process.env.DB_PASSWORD!,
  DB_HOST: process.env.DB_HOST!,
};
