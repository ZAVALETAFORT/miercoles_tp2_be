// In-memory state. Moves to a DAO in class 8.
const books = [
  { id: 1, isbn: "9780307474728", titulo: "Cien años de soledad", autor: "Gabriel García Márquez", stock: 3 },
  { id: 2, isbn: "9780345391803", titulo: "Guía del autoestopista galáctico", autor: "Douglas Adams", stock: 0 },
  { id: 3, isbn: "9780140449136", titulo: "La Odisea", autor: "Homero", stock: 5 },
  { id: 4, isbn: "9780061120084", titulo: "Matar a un ruiseñor", autor: "Harper Lee", stock: 2 },
  { id: 5, isbn: "9780393312838", titulo: "1984", autor: "George Orwell", stock: 1 },
];

//prox ID para los nuevos libros
let nextId = 6;


async function getAll() {
  return [...books]; //mando la copia del array
}

async function getById(id) {
  return books.find((book) => book.id === id) ?? null; //si no existe es null
}

async function getByIsbn(isbn) {
  return books.find((book) => book.isbn === isbn) ?? null; //si no existe es null
}

async function save(data) {
  const book = { id: nextId++, ...data }; //Asigna un id autoincremetal y guarda

  books.push(book);

  return book;
}

async function update(id, changes) {
  const index = books.findIndex((book) => book.id === id);

  if (index === -1) return null;

  books[index] = { ...books[index], ...changes };

  return books[index]; //devuelvo el libro actualizado
}

async function deleteBook(id) { //si borro es true, si no existe false
  const index = books.findIndex((book) => book.id === id);

  if (index === -1) return false; 

  books.splice(index, 1);

  return true;
}

export default {
  getAll,
  getById,
  getByIsbn,
  save,
  update,
  delete: deleteBook,
};
