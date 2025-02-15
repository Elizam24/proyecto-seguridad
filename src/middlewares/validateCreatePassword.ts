import { Request, Response, NextFunction } from "express";
import { PasswordValidationError } from "../error/PasswordValidationError";

export function validateCreatePassword(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email, password } = req.body;

  // Validación de la contraseña
  if (!password || password.length < 8) {
    return next(
      new PasswordValidationError(
        "Password must be at least 8 characters long."
      )
    );
  }

  next();
}
