async function updateBook(id, changes, dao) {
  return dao.update(id, changes);
}
 //despues meto reglas de negocio 
export default updateBook;