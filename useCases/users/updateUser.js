// Actualiza un usuario mediante su DAO
async function updateUser(id, changes, dao) {
  return dao.update(id, changes);
}

export default updateUser;