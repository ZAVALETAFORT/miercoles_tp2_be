async function getBookById(id, dao) {
  return dao.getById(id);
}

export default getBookById;