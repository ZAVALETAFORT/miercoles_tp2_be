import { Router } from "express";
import createBooksRouter from "./booksRoutes.js";
import createUsersRouter from "./usersRoutes.js";

/**
 * Router principal centralizado.
 * Recibe las dependencias de controladores necesarias y las propaga a los sub-routers.
 */
function createRouter(booksController, usersController) {
  const router = Router();

  // Montamos los routers de recursos
  router.use("/books", createBooksRouter(booksController));
  router.use("/users", createUsersRouter(usersController));

  return router;
}

export default createRouter;
