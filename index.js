import express from "express";

import logger from "./middlewares/logger.js";
import notFound from "./middlewares/notFound.js";
import errorHandler from "./middlewares/errorHandler.js";
import routes from "./routes/routes.js";

const app = express();
const PORT = process.env.PORT || 8000;

// Middlewares globales — el orden es el orden de ejecución
app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas: el prefijo /books se pega acá, no en el router
app.use("/app", routes);

// Ninguna ruta matcheó → 404 con formato estandarizado
app.use(notFound);
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Servidor Express corriendo en http://localhost:${PORT}`);
});


