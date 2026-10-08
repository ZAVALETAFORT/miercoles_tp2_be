// Elimina un usuario; devuelve false si no existe
async function deleteUser(id, dao) {
  return dao.delete(id);
}

export default deleteUser;