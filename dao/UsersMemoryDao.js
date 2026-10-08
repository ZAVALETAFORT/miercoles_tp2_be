
class UsersMemoryDao {
  #users = [];
  #nextId = 1;

  // Lista todos los usuarios
  async getAll() {
    return [...this.#users];
  }

  // Busca un usuario por ID
  async getById(id) {
    return this.#users.find(user => user.id === Number(id)) ?? null;
  }

  // Busca un usuario por email
  async getByEmail(email) {
    return this.#users.find(user => user.email === email) ?? null;
  }

  // Guarda un usuario nuevo
  async save(data) {
    const { id: _ignored, ...userData } = data;
    const user = { id: this.#nextId++, ...userData };
    this.#users.push(user);
    return user;
  }

  // Actualiza un usuario existente
  async update(id, changes) {
    const index = this.#users.findIndex(user => user.id === Number(id));
    if (index === -1) return null;

    const { id: _ignored, ...data } = changes;
    this.#users[index] = { ...this.#users[index], ...data };
    return this.#users[index];
  }

  // Elimina un usuario
  async delete(id) {
    const index = this.#users.findIndex(user => user.id === Number(id));
    if (index === -1) return false;

    this.#users.splice(index, 1);
    return true;
  }

  async init() {}
}

export default new UsersMemoryDao();
