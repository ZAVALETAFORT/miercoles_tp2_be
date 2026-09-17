import {Router } from "express";
import booksController from "../controllers/booksController.js";

const booksRoutes = Router();

// Rutas sin el prefijo /books — lo agrega index.js al montar el router
booksRoutes.get("/", booksController.listar);
booksRoutes.get("/:id", booksController.obtener);
booksRoutes.post("/", booksController.crear);
booksRoutes.put("/:id", booksController.actualizar);
booksRoutes.delete("/:id", booksController.eliminar);

export default booksRoutes;
