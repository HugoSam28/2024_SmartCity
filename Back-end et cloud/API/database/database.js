import pg from "pg";
import "dotenv/config";

const pgPool = new pg.Pool({
  user: process.env.USERDB,
  host: process.env.HOSTDB,
  database: process.env.DATABASE,
  password: process.env.PASSWORDDB,
  port: process.env.PORTDB
})