import { Client } from "pg";
import dotenv from "dotenv";

// Cargar las variables de entorno
dotenv.config();

const client = new Client({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432"),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

client
  .connect()
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Connection error", err.stack));

export { client };
