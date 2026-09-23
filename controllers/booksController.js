// import books from "../dao/booksMemoryDao.js";
import AppError from "../errors/AppError.js";
// import createBook  from "../useCases/createBook.js";
import getAllBooks from "../useCases/getAllBooks.js";

const getBookTitle = (book) => book.titulo ?? book.title ?? "";
const getBookAuthor = (book) => book.autor ?? book.author ?? "";
const getValueByField = (book, field) => {
  if (field === "title" || field === "titulo") return getBookTitle(book);
  if (field === "author" || field === "autor") return getBookAuthor(book);
  return book[field] ?? "";
};

const bookNotFound = (id) =>
  new AppError("BOOK_NOT_FOUND", `No book exists with id ${id}`, 404);

// GET /books — filtro (?author=), orden (?sort=) y paginado (?page=&limit=)
async function list(req, res, next) {
  // const { author, autor, sort } = req.query;
  // let result = [...books];

  // const term = (author ?? autor ?? "").toString().toLowerCase();
  // if (term) {
  //   result = result.filter((b) => getBookAuthor(b).toLowerCase().includes(term));
  // }

  // if (sort) {
  //   const desc = sort.toString().startsWith("-");
  //   const field = desc ? sort.toString().slice(1) : sort.toString();
  //   result.sort((a, b) => {
  //     const left = getValueByField(a, field);
  //     const right = getValueByField(b, field);
  //     if (left < right) return desc ? 1 : -1;
  //     if (left > right) return desc ? -1 : 1;
  //     return 0;
  //   });
  // }

  // const { page, limit } = req.pagination;
  // const from = (page - 1) * limit;
  // result = result.slice(from, from + limit);

  const result = await getAllBooks();
  res.status(200).json(result);
}

// GET /books/:id
function get(req, res, next) {
  const book = books.find((b) => b.id === Number(req.params.id));
  if (!book) return next(bookNotFound(req.params.id));
  res.status(200).json(book);
}

// POST /books — req.body ya validado por validate(createBookSchema)
async function create(req, res, next) {
// const newBook = await createBook(req.body);
//   res.status(201).json(newBook);
}

// PUT /books/:id — req.body ya validado por validate(updateBookSchema)
function update(req, res, next) {
  const index = books.findIndex((b) => b.id === Number(req.params.id));
  if (index === -1) return next(bookNotFound(req.params.id));

  const nextBook = { ...books[index] };

  if (req.body.title !== undefined || req.body.titulo !== undefined) {
    nextBook.titulo = req.body.title ?? req.body.titulo;
  }

  if (req.body.author !== undefined || req.body.autor !== undefined) {
    nextBook.autor = req.body.author ?? req.body.autor;
  }

  if (req.body.isbn !== undefined) nextBook.isbn = req.body.isbn;
  if (req.body.stock !== undefined) nextBook.stock = req.body.stock;

  books[index] = nextBook;
  res.status(200).json(books[index]);
}

// DELETE /books/:id
function remove(req, res, next) {
  const index = books.findIndex((b) => b.id === Number(req.params.id));
  if (index === -1) return next(bookNotFound(req.params.id));

  books.splice(index, 1);
  res.status(200).json({ message: "Book deleted successfully" });
}

export default { list, get, create, update, remove };
