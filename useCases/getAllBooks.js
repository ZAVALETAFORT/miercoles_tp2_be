import {getAll} from  "../dao/booksMemoryDao.js";
async function getAllBooks() {
  return await getAll();
}

export default getAllBooks;