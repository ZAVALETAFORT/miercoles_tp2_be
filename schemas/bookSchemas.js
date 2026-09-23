import { z } from "zod";

// Definimos los campos base reutilizables
const fields = {
  title: z.string({ error: "Title is required" }).min(1, "Title cannot be empty"),
  author: z.string({ error: "Author is required" }).min(1, "Author cannot be empty"),
  isbn: z.string().regex(/^\d{13}$/, "ISBN must be exactly 13 digits"),
  stock: z
    .number({ error: "Stock must be a number" })
    .int("Stock must be an integer")
    .nonnegative("Stock cannot be negative"),
};

const normalizeBookData = (data) => ({
  title: data.title ?? data.titulo,
  author: data.author ?? data.autor,
  isbn: data.isbn,
  stock: data.stock ?? 0,
});

// POST /books — title y author obligatorios, isbn opcional, stock con default 0
const createBookSchema = z
  .object({
    title: fields.title.optional(),
    titulo: fields.title.optional(),
    author: fields.author.optional(),
    autor: fields.author.optional(),
    isbn: fields.isbn.optional(),
    stock: fields.stock.default(0),
  })
  .superRefine((data, ctx) => {
    const title = data.title ?? data.titulo;
    const author = data.author ?? data.autor;

    if (!title) {
      ctx.addIssue({ code: "custom", path: ["title"], message: "Title is required" });
    }

    if (!author) {
      ctx.addIssue({ code: "custom", path: ["author"], message: "Author is required" });
    }
  })
  .transform((data) => normalizeBookData(data));

// PUT /books/:id — actualización: todos los campos opcionales, stock SIN default
const updateBookSchema = z
  .object({
    title: fields.title.optional(),
    titulo: fields.title.optional(),
    author: fields.author.optional(),
    autor: fields.author.optional(),
    isbn: fields.isbn.optional(),
    stock: fields.stock.optional(),
  })
  .transform((data) => normalizeBookData(data));

// Query params para listar (?page=&limit=) — llegan como strings (z.coerce)
const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
});

export { createBookSchema, updateBookSchema, paginationSchema };
