import { Request, Response, NextFunction } from "express";
import { PasswordService } from "../services/passwordService";
import { PasswordMismatchError } from "../errors/PasswordMismatchError";
import { PasswordNotFoundError } from "../errors/PasswordNotFoundError";
import { PasswordValidationError } from "../errors/PasswordValidationError";
import { AppError } from "../error/app.error";

const passwordService = new PasswordService();

export class PasswordController {
  // Crear Contraseña (asociar al registro de usuario)
  static async createPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      // Validación de contraseña
      if (!password || password.length < 8) {
        return next(
          new PasswordValidationError(
            "Password must be at least 8 characters long."
          )
        );
      }

      const passwordCreated = await passwordService.createPassword(
        email,
        password
      );
      return res.status(201).json({
        message: "Password created successfully",
        email,
      });
    } catch (error) {
      next(error);
    }
  }

  // Leer Contraseña (Obtener la contraseña por usuario)
  static async getPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.params;

      const password = await passwordService.getPassword(email);
      if (!password) {
        return next(new PasswordNotFoundError("Password not found."));
      }

      return res.status(200).json({
        message: "Password retrieved successfully",
        password,
      });
    } catch (error) {
      next(error);
    }
  }

  // Actualizar Contraseña (Actualizar)
  static async updatePassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.params;
      const { newPassword, confirmPassword } = req.body;

      // Validación de contraseñas
      if (newPassword !== confirmPassword) {
        return next(new PasswordMismatchError("Passwords do not match."));
      }

      if (!newPassword || newPassword.length < 8) {
        return next(
          new PasswordValidationError(
            "Password must be at least 8 characters long."
          )
        );
      }

      const updatedPassword = await passwordService.updatePassword(
        email,
        newPassword
      );
      if (!updatedPassword) {
        return next(new PasswordNotFoundError("Password not found."));
      }

      return res.status(200).json({
        message: "Password updated successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  // Eliminar Contraseña (Eliminar, opcional)
  static async deletePassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.params;

      const deletedPassword = await passwordService.deletePassword(email);
      if (!deletedPassword) {
        return next(new PasswordNotFoundError("Password not found to delete."));
      }

      return res.status(200).json({
        message: "Password deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}
