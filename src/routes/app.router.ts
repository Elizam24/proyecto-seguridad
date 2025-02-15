import express from "express";
import { router as userRoutes } from "./user.router";
import { router as passwordRoutes } from "./password.router";

const appRouter = express.Router();

// Rutas de usuarios
appRouter.use("/api", userRoutes); // Los endpoints de usuarios estarán bajo /api
// Rutas de contraseñas
appRouter.use("/api", passwordRoutes); // Los endpoints de contraseñas estarán bajo /api

export { appRouter };
