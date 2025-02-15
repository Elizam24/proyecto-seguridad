import express from "express";
import { PasswordController } from "./controllers/password.controller";
import { validateCreatePassword } from "../middlewares/validateCreatePassword"; // Middleware de validación para crear contraseña
import { validateUpdatePassword } from "../middlewares/validateUpdatePassword"; // Middleware de validación para actualizar contraseña
import { errorHandler } from "../middlewares/errorHandler"; // Middleware global de manejo de errores

const router = express.Router();

// Ruta para crear una contraseña para un usuario
router.post(
  "/passwords",
  validateCreatePassword, // Middleware para validar los datos antes de crear la contraseña
  PasswordController.createPassword // Controlador para crear la contraseña
);

// Ruta para obtener la contraseña por email
router.get("/passwords/:email", PasswordController.getPassword); // Controlador para obtener la contraseña

// Ruta para actualizar la contraseña
router.put(
  "/passwords/:email",
  validateUpdatePassword, // Middleware para validar los datos antes de actualizar la contraseña
  PasswordController.updatePassword // Controlador para actualizar la contraseña
);

// Ruta para eliminar la contraseña
router.delete("/passwords/:email", PasswordController.deletePassword); // Controlador para eliminar la contraseña

// Middleware global para manejar errores
router.use(errorHandler);

export { router };
