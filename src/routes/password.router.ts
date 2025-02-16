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
  async (req, res, next) => {
    try {
      await PasswordController.createPassword(req, res);
    } catch (error) {
      next(error); // Pasar el error al middleware de manejo de errores
    }
  }
);

// Ruta para obtener la contraseña por email
router.get("/passwords/:email", async (req, res, next) => {
  try {
    await PasswordController.getPassword(req, res);
  } catch (error) {
    next(error);
  }
});

// Ruta para actualizar la contraseña
router.put(
  "/passwords/:email",
  validateUpdatePassword, // Middleware para validar los datos antes de actualizar la contraseña
  async (req, res, next) => {
    try {
      await PasswordController.updatePassword(req, res);
    } catch (error) {
      next(error);
    }
  }
);

// Ruta para eliminar la contraseña
router.delete("/passwords/:email", async (req, res, next) => {
  try {
    await PasswordController.deletePassword(req, res);
  } catch (error) {
    next(error);
  }
});

// Middleware global para manejar errores
router.use(errorHandler);

export { router };
