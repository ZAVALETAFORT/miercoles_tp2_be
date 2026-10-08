
import usersMemoryDao from "./UsersMemoryDao.js";
import usersSequelizeDao from "./UsersSequelizeDao.js";

function getUsersDao() {
  const type = process.env.PERSISTENCE_TYPE ?? "memory"; //dao en memoria por defecto

  if (type === "memory") {
    return usersMemoryDao;
  }

  if (type === "sequelize") {
    return usersSequelizeDao;
  }

  throw new Error(`Persistencia no soportada: ${type}`);
}

export default getUsersDao;
