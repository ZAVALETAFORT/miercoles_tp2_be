import { Router } from "express";
import booksRoutes from "./booksRoutes.js";
const routes= Router()


// Montamos todos los routers de recursos acá con su ruta base
routes.use("/books",booksRoutes)

export default routes