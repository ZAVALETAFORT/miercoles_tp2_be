import { Router } from "express";
import booksRoutes from "./booksRoutes.js";
const routes= Router()

routes.use("/books",booksRoutes)

export default routes