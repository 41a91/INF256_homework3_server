import type Config from "./types.js";

const config: Config = {
  server: {
    host: process.env.SERVER_HOST || "",
    port: process.env.SERVER_PORT ? parseInt(process.env.SERVER_PORT) : 0,
  },
  database: {
    host: process.env.DATABASE_HOST || "",
    user: process.env.DATABASE_USER || "",
    password: process.env.DATABASE_PASSWORD || "",
    database: process.env.DATABASE || "",
    connectionLimit: process.env.DATABASE_CONNECTION_LIMIT
      ? parseInt(process.env.DATABASE_CONNECTION_LIMIT)
      : 0,
  },
};
