async function deleteBook(id, dao) {
  return dao.delete(id);
}

export default deleteBook;