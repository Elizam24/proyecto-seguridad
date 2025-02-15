import express from "express";
import dotenv from "dotenv";
import { json, urlencoded } from "body-parser";
import { AppRouter } from "./routes/appRouter"; // Ruta para importar las rutas
import { errorHandler } from "./middlewares/errorHandler"; // Middleware de manejo de errores

// Cargar las variables de entorno
dotenv.config();

// Crear la aplicación Express
const app = express();

// Middleware para parsear solicitudes JSON y URL-encoded
app.use(json());
app.use(urlencoded({ extended: true }));

// Rutas de la aplicación
app.use("/api", AppRouter);

// Middleware global para manejar errores
app.use(errorHandler);

// Iniciar el servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
