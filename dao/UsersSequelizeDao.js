
import User from "./Model/User.js";
import sequelize from "../connection/sequelize.js";

class UsersSequelizeDao {

  // Inicializa la conexión y sincroniza el modelo
  async init() {
    await sequelize.authenticate();
    await User.sync();
  }

  // Obtiene todos los usuarios
  async getAll() {
    return User.findAll();
  }

  // Busca usuario por ID
  async getById(id) {
    return User.findByPk(id);
  }

  // Busca usuario por email
  async getByEmail(email) {
    return User.findOne({ where: { email } });
  }

  // Crea un usuario
  async save(data) {
    return User.create(data);
  }

  // Actualiza un usuario
  async update(id, changes) {
    const user = await User.findByPk(id);
    if (!user) return null;

    const { id: _ignored, ...data } = changes;
    return user.update(data);
  }

  // Elimina un usuario
  async delete(id) {
    const user = await User.findByPk(id);
    if (!user) return false;

    await user.destroy();
    return true;
  }
}

export default new UsersSequelizeDao();
