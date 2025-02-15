import { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { UserService } from "../services/userService";
import { PasswordNotFoundError } from "../errors/PasswordNotFoundError";
import { PasswordValidationError } from "../errors/PasswordValidationError";
import { AppError } from "../error/app.error";

const userService = new UserService();

export class UserController {
  // Crear Usuario (Crear)
  static async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      // Validación de la contraseña
      if (!password || password.length < 8) {
        return next(
          new PasswordValidationError(
            "Password must be at least 8 characters long."
          )
        );
      }

      const user = await userService.createUser(email, password);
      return res.status(201).json({
        message: "User created successfully",
        user,
      });
    } catch (error) {
      next(error);
    }
  }

  // Leer Usuario por ID (Leer)
  static async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const user = await userService.getUserById(id);
      if (!user) {
        return next(new AppError("User not found.", 404));
      }

      return res.status(200).json({
        message: "User retrieved successfully",
        user,
      });
    } catch (error) {
      next(error);
    }
  }

  // Actualizar Usuario (Actualizar)
  static async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { email, password } = req.body;

      if (!email || !password) {
        return next(
          new AppError("Email and password are required for update.", 400)
        );
      }

      const updatedUser = await userService.updateUser(id, email, password);
      if (!updatedUser) {
        return next(new AppError("User not found to update.", 404));
      }

      return res.status(200).json({
        message: "User updated successfully",
        user: updatedUser,
      });
    } catch (error) {
      next(error);
    }
  }

  // Eliminar Usuario (Eliminar)
  static async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const deletedUser = await userService.deleteUser(id);
      if (!deletedUser) {
        return next(new AppError("User not found to delete.", 404));
      }

      return res.status(200).json({
        message: "User deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}
