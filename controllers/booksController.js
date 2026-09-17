import books from "../data/books.js";
import AppError from "../errors/AppError.js";
import {createBookSchema} from "../schemas/bookSchemas.js";

// Helper para no repetir la forma del error en cada lado.
function error(res, status, code, message) {
  return res.status(status).json({ error: { code, message } });
}

// GET /books  — lista, con filtro (?autor=), orden (?sort=) y paginado (?page=&limit=)
function listar(req, res) {
  const { autor, sort } = req.query;
  let resultado = [...books];

  if (autor) {
    const termino = autor.toLowerCase();
    resultado = resultado.filter((l) => l.autor.toLowerCase().includes(termino));
  }

  if (sort) {
    const desc = sort.startsWith("-");
    const campo = desc ? sort.slice(1) : sort;
    resultado.sort((a, b) => {
      if (a[campo] < b[campo]) return desc ? 1 : -1;
      if (a[campo] > b[campo]) return desc ? -1 : 1;
      return 0;
    });
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 20;
  const desde = (page - 1) * limit;
  resultado = resultado.slice(desde, desde + limit);

  res.status(200).json(resultado);
}

// GET /books/:id
// function obtener(req, res) {
//   const id = Number(req.params.id);
//   const libro = books.find((l) => l.id === id);
//   if (!libro) {
//     return error(res, 404, "BOOK_NOT_FOUND", `No book exists with id ${req.params.id}`);
//   }
//   res.status(200).json(libro);
// }

// function obtener(req, res, next) {
//   const id = Number(req.params.id);
//   const libro = books.find((l) => l.id === id);
//   if (!libro) {
//     return next(new Error(`No book exists with id ${req.params.id}`));
//   }
//   res.status(200).json(libro);
// }
// function obtener(req, res) {
//   const id = Number(req.params.id);
//   const libro = books.find((l) => l.id === id);
//   if (!libro) {
//     throw new Error(`No book exists with id ${req.params.id} con throw`)
//   }
//   res.status(200).json(libro);
// }

//  async function obtener (req, res) {
//   const id = Number(req.params.id);
//  const libro= await books.find()
//   res.status(200).json(libro);
// }

function obtener (req, res, next) {
return  next(new AppError(404, "BOOK_NOT_FOUND", `No book exists with id ${req.params.id}`));
}


// POST /books
function crear(req, res) {
  const validationResult = createBookSchema.parse(req.body);
  console.log(`🚀 ~ crear ~ validationResult:`, validationResult)
  const { titulo, autor, isbn, stock } = req.body;
  if (!titulo || !autor) {
    return error(res, 400, "MISSING_DATA", "Title and author are required");
  }

  const ids = books.map((l) => l.id);
  const nuevoLibro = {
    id: ids.length > 0 ? Math.max(...ids) + 1 : 1,
    isbn: isbn ?? "No ISBN",
    titulo,
    autor,
    stock: stock ?? 0,
  };

  books.push(nuevoLibro);
  res.status(201).json(nuevoLibro);
}

// PUT /books/:id
function actualizar(req, res) {
  const id = Number(req.params.id);
  const index = books.findIndex((l) => l.id === id);
  if (index === -1) {
    return error(res, 404, "BOOK_NOT_FOUND", `No book exists with id ${req.params.id}`);
  }

  books[index] = { ...books[index], ...req.body, id };
  res.status(200).json(books[index]);
}

// DELETE /books/:id
function eliminar(req, res) {
  const id = Number(req.params.id);
  const index = books.findIndex((l) => l.id === id);
  if (index === -1) {
    return error(res, 404, "BOOK_NOT_FOUND", `No book exists with id ${req.params.id}`);
  }

  books.splice(index, 1);
  res.status(200).json({ message: "Book deleted successfully" });
}

export default { listar, obtener, crear, actualizar, eliminar };
