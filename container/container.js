
import booksMemoryDao from "../dao/booksMemoryDao.js";
import makeBookUseCases from "../useCases/books/makeBookUseCases.js";
import BooksController from "../controllers/booksController.js";

import getUsersDao from "../dao/getUsersDao.js";
import makeUserUseCases from "../useCases/users/makeUserUseCases.js";
import UsersController from "../controllers/usersController.js";

import createRouter from "../routes/index.js";

// Ensamblamos las dependencias de libros
const bookUseCases = makeBookUseCases(booksMemoryDao);
const booksController = new BooksController(bookUseCases);

// Ensamblamos las dependencias de usuarios
const usersDao = getUsersDao();
const userUseCases = makeUserUseCases(usersDao);
const usersController = new UsersController(userUseCases);

// Inicializamos la persistencia y construimos las rutas
async function createContainer() {
  await usersDao.init();

  const router = createRouter(booksController, usersController);
  return router;
}

export default createContainer;
