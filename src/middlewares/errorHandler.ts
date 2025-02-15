import { Request, Response, NextFunction } from "express";

// Middleware para manejar los errores
export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err); // Puedes cambiar esto por un logger si lo deseas
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
    details: err.details || null,
  });
};
