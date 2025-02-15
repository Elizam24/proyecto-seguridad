import express from "express";
import { UserController } from "./controllers/user.controller";
import { PasswordController } from "./controllers/password.controller";

const app = express();

// Middleware para parsear el cuerpo de la solicitud
app.use(express.json());

// Rutas para los usuarios
app.post("/api/users", UserController.create.User); // Crear usuario
app.get("/api/users/:id", UserController.getById); // Obtener usuario por ID
app.put("/api/users/:id", UserController.update); // Actualizar usuario
app.delete("/api/users/:id", UserController.delete); // Eliminar usuario

// Rutas para las contraseñas
app.post("/api/passwords", PasswordController.create); // Crear contraseña
app.get("/api/passwords/:email", PasswordController.getByEmail); // Obtener contraseña por email
app.put("/api/passwords/:email", PasswordController.update); // Actualizar contraseña
app.delete("/api/passwords/:email", PasswordController.delete); // Eliminar contraseña

// Exportar la aplicación
export default app;
