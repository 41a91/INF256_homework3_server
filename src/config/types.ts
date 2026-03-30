export default interface Config {
  server: Server;
  database: Database;
}

interface Server {
  host: string;
  port: number;
}

interface Database {
  host: string;
  user: string;
  password: string;
  database: string;
  connectionLimit: number;
}
