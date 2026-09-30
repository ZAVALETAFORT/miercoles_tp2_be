
import createBook from "./createBook.js";
import deleteBook from "./deleteBook.js";
import getBookById from "./getBookById.js";
import getBooks from "./getBooks.js";
import updateBook from "./updateBook.js";

function booksCases(dao) {
    return {
        createBookUseCase: createBook(dao),
        deleteBookUseCase: deleteBook(dao),
        getBookByIdUseCase: getBookById(dao),
        getBooksUseCase: getBooks(dao),
        updateBookUseCase: updateBook(dao)
    }
}

export default booksCases;