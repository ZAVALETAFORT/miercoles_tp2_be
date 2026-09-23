import {Router } from "express";
import booksController from "../controllers/booksController.js";
import { validate, validateQuery } from "../middlewares/validate.js";
import { createBookSchema, updateBookSchema, paginationSchema } from "../schemas/bookSchemas.js";

const booksRoutes = Router();

// Rutas sin el prefijo /books — lo agrega index.js al montar el router
booksRoutes.get("/", validateQuery(paginationSchema), booksController.list);
booksRoutes.get("/:id", booksController.get);
booksRoutes.post("/", validate(createBookSchema), booksController.create);
booksRoutes.put("/:id", validate(updateBookSchema), booksController.update);
booksRoutes.delete("/:id", booksController.remove);

export default booksRoutes;
