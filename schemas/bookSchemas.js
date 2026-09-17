import {z} from "zod";

const fields={
     id: z.number().int().positive().optional(),
     isbn: z.string().min(13).max(13),
     titulo: z.string().min(1).max(100),
     autor: z.string().min(1).max(100),
     stock: z.number().int().nonnegative(),
}

// post
const createBookSchema=z.object({
    isbn: fields.isbn,
    titulo: fields.titulo,
    autor: fields.autor,
    stock: fields.stock,
});

export {createBookSchema};