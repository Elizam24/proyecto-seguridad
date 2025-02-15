import { Request, Response, NextFunction } from "express";
import { PasswordMismatchError } from "../error/PasswordMismatchError";
import { PasswordValidationError } from "../error/PasswordValidationError";

export function validateUpdatePassword(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { newPassword, confirmPassword } = req.body;

  // Validación de la contraseña
  if (newPassword !== confirmPassword) {
    return next(new PasswordMismatchError("Passwords do not match."));
  }

  // Validación de longitud de la contraseña
  if (!newPassword || newPassword.length < 8) {
    return next(
      new PasswordValidationError(
        "Password must be at least 8 characters long."
      )
    );
  }

  next();
}
