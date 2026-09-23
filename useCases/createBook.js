// import books from "../dao/booksMemoryDao.js";
// import AppError from "../errors/AppError.js";


// async function createBook(data) {
//      const title = data.title ?? data.titulo;
//        const author = data.author ?? data.autor;
//        const { isbn, stock } = data;
     
//        if (isbn && books.some((b) => b.isbn === isbn)) {
//          throw new AppError("ISBN_DUPLICATE", `A book with ISBN ${isbn} already exists`, 409);
//        }
     
//        const ids = books.map((b) => b.id);
//        const newBook = {
//          id: ids.length > 0 ? Math.max(...ids) + 1 : 1,
//          isbn: isbn ?? "No ISBN",
//          titulo: title,
//          autor: author,
//          stock,
//        };
     
//        books.push(newBook);

//        return newBook;   
     
// }

// export default createBook;