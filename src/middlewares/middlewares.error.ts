import express, { Request, Response, NextFunction } from "express";
import { AppError } from "./err";
import { PasswordValidationError } from "./error/Password.Validation.error";
import { PasswordNotFoundError } from "./errors/PasswordNotFoundError";
import { PasswordMismatchError } from "./errors/PasswordMismatchError";
import { UnauthorizedError } from "./errors/UnauthorizedError";
import { InternalServerError } from "./errors/InternalServerError";

const app = express();

// Middlewares de configuración y rutas
app.use(express.json()); // Para recibir solicitudes JSON
app.use(express.urlencoded({ extended: true })); // Para recibir datos de formularios

// Ejemplo de una ruta que lanza un error de contraseña
app.post(
  "/change-password",
  (req: Request, res: Response, next: NextFunction) => {
    const { password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return next(new PasswordMismatchError("Passwords do not match."));
    }

    // Si la contraseña no cumple con las validaciones
    if (!password || password.length < 8) {
      return next(
        new PasswordValidationError(
          "Password must be at least 8 characters long."
        )
      );
    }

    // Ejemplo: Si la contraseña no se encuentra en la base de datos (simulación)
    const passwordExists = false;
    if (!passwordExists) {
      return next(new PasswordNotFoundError("Password not found."));
    }

    // Simulación de éxito
    res.status(200).send("Password changed successfully.");
  }
);

// Middleware para manejar errores globales
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  // Si el error es de tipo AppError o cualquier error personalizado
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  // Si el error no es específico, se responde con un error genérico
  return res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});

// Arrancar el servidor
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
