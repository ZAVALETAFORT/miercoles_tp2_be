import getUsers from "./getUsers.js";
import getUserById from "./getUserById.js";
import createUser from "./createUser.js";
import updateUser from "./updateUser.js";
import deleteUser from "./deleteUser.js";

// Recibe el DAO y lo inyecta en los cinco casos de uso
function makeUserUseCases(dao) {
  return {
    getUsers: () => getUsers(dao),
    getUserById: (id) => getUserById(id, dao),
    createUser: (data) => createUser(data, dao),
    updateUser: (id, changes) => updateUser(id, changes, dao),
    deleteUser: (id) => deleteUser(id, dao),
  };
}

export default makeUserUseCases;