import { Router } from "express";
import {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} from "../controllers/booksControllers.js";

const booksRoutes = Router();

booksRoutes.get("/", getAllBooks);
booksRoutes.get("/:id", getBookById);
booksRoutes.post("/", createBook);
booksRoutes.put("/:id", updateBook);
booksRoutes.delete("/:id", deleteBook);

export default booksRoutes;
