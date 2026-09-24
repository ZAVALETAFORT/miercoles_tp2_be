import AppError from "../errors/AppError.js";

async function createBook(data, dao) {

  if (data.isbn) {
    const book = await dao.getByIsbn(data.isbn);

    if (book) { //si existe por isbn, no lo creo
      
        throw new AppError( "ISBN_DUPLICATE", "Ese ISBN ya existe",409);
    }
  }

  return dao.save(data); //guardo si no existe
}

export default createBook;