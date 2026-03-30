import "dotenv/config";
import { defineConfig } from "drizzle-kit";
import config from "./src/config/config";

export default defineConfig({
  out: "./drizzle", //This is where the migration/snapshot files will get placed
  schema: "./src/db/schema", //This is where drizzle will look for our ORM Objects
  dialect: "mysql",
  dbCredentials: {
    host: config.database.host,
    user: config.database.user,
    password: config.database.password,
    database: config.database.database,
  },
});
