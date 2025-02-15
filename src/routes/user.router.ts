import express from "express";
import { UserController } from "../controllers/user.controller";
import { validateCreateUser } from "../middlewares/validateCreateUser"; // Middleware de validación
import { validateUpdateUser } from "../middlewares/validateUpdateUser"; // Middleware de validación
import { handleError } from "../errors/handleError"; // Middleware global de manejo de errores

const router = express.Router();

// Ruta para crear un usuario
router.post("/users", validateCreateUser, UserController.createUser);

// Ruta para obtener un usuario por ID
router.get("/users/:id", UserController.getUserById);

// Ruta para actualizar un usuario
router.put("/users/:id", validateUpdateUser, UserController.updateUser);

// Ruta para eliminar un usuario
router.delete("/users/:id", UserController.deleteUser);

// Middleware para manejar errores
router.use(handleError);

export { router };
