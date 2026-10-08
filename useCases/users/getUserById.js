// Busca un usuario por ID; devuelve null si no existe
async function getUserById(id, dao) {
  return dao.getById(id);
}

export default getUserById;