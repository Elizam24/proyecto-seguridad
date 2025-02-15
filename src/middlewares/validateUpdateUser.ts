import { Request, Response, NextFunction } from "express";
import { AppError } from "../error/app.error";

export function validateUpdateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email, password } = req.body;

  // Validación de los datos para actualización
  if (!email || !password) {
    return next(
      new AppError("Email and password are required for update.", 400)
    );
  }

  // Si la contraseña tiene menos de 8 caracteres
  if (password.length < 8) {
    return next(
      new AppError("Password must be at least 8 characters long.", 400)
    );
  }

  next();
}
