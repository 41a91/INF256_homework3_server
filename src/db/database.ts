import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import config from "../config/config.js";
import * as schema from "./schema/index.js";

const pool = mysql.createPool({
  host: config.database.host,
  user: config.database.user,
  password: config.database.password,
  database: config.database.database,
  waitForConnections: true,
  connectionLimit: config.database.connectionLimit,
});

export default drizzle(pool, { schema, mode: "default" });
