import express from "express";
import { logger } from "./middlewares/logger.js";
import { notFound } from "./middlewares/notFound.js";
import routes from "./routes/routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(logger);

app.use("/app", routes);

app.use(notFound);

app.listen(8080, () => {
  console.log("Server on port 8080");
});
