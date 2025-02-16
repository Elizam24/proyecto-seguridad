import "reflect-metadata";
import dotenv from "dotenv";

dotenv.config();
import { env } from "./config";
import { client } from "./database/postgres";
import { appRouter } from "./routes/app.router";
import { Server } from "./server";

async function main() {
  // Conexión a la base de datos
  await client.connect();

  // Iniciar el servidor
  const server = new Server({
    port: env.PORT || 3000,
    route: appRouter,
  });

  console.log("Servidor en el puerto:", env.PORT || 3000);
  await server.start();
}

main();
