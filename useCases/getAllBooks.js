//import {getAll} from  "../dao/booksMemoryDao.js";
//lo libero para testearlo con otro dao

async function getAllBooks(dao) {
  return dao.getAll();
}

export default getAllBooks;