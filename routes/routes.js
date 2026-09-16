import { Router } from "express";
import categoryRoutes from "./categoryRoutes.js";
import booksRoutes from "./booksRoutes.js";
import { logger } from "../middlewares/logger.js";


const routes = Router();

routes.use("/categories", categoryRoutes);
routes.use(logger);
routes.use("/books", booksRoutes);   
export default routes;