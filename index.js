import express from "express";

import logger from "./middlewares/logger.js";
import notFound from "./middlewares/notFound.js";
import errorHandler from "./middlewares/errorHandler.js";

//usuarios
import getUsersDao from "./dao/getUsersDao.js";
import makeUserUseCases from "./useCases/users/makeUserUseCases.js";
import UsersController from "./controllers/usersController.js";

// Importación del módulo de configuración centralizada de variables de entorno
import { PORT } from "./config/config.js";

// Importación de módulos de arquitectura para la composición
import booksMemoryDao from "./dao/booksMemoryDao.js";
import makeBookUseCases from "./useCases/books/makeBookUseCases.js";
import BooksController from "./controllers/booksController.js";
import createRouter from "./routes/index.js";

import sequelize from "./connection/sequelize.js";
import User from "./dao/Model/User.js";

// AGREGADO: Contenedor de dependencias
import createContainer from "./container/container.js";

const app = express();

// -----------------------------------------------------------------------------
// COMPOSITION ROOT (Punto de Ensamblado e Inyección de Dependencias - Clase 8)
// 1. Instanciamos o seleccionamos el DAO (puerto de persistencia)
// 2. Pasamos el DAO a la Factory de Casos de Uso (makeBookUseCases)
// 3. Inyectamos los Casos de Uso al Controlador (BooksController)
// 4. Inyectamos el Controlador al Router (createRouter)
// -----------------------------------------------------------------------------
const bookUseCases = makeBookUseCases(booksMemoryDao);
const booksController = new BooksController(bookUseCases);
//const router = createRouter(booksController);


// Inyección de dependencias de usuarios
const usersDao = getUsersDao();
const userUseCases = makeUserUseCases(usersDao);
const usersController = new UsersController(userUseCases);

const router = createRouter(booksController, usersController);

// Middlewares globales
app.use(logger);
app.use(express.json());

//sequelize.sync({ alter: true });

// Router centralizado de la aplicación
// MODIFICADO: El contenedor incorpora las rutas de usuarios
app.use(await createContainer());

// Manejadores de cierre (404 Not Found y Error Handler global)
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(
    `Servidor Express (Clase 8) corriendo en http://localhost:${PORT}`,
  );
});
