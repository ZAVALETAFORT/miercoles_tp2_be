
import AppError from "../errors/AppError.js";

// Controlador de usuarios con casos de uso inyectados
class UsersController {
  #useCases;

  constructor(useCases) {
    this.#useCases = useCases;
  }

  // GET /users
  list = async (req, res) => {
    const users = await this.#useCases.getUsers();
    res.json(users);
  };

  // GET /users/:id
  get = async (req, res) => {
    const user = await this.#useCases.getUserById(Number(req.params.id));

    if (!user) {
      throw new AppError("USER_NOT_FOUND", "Usuario no encontrado", 404);
    }

    res.json(user);
  };

  // POST /users
  create = async (req, res) => {
    const user = await this.#useCases.createUser(req.body);
    res.status(201).json(user);
  };

  // PUT /users/:id
  update = async (req, res) => {
    const user = await this.#useCases.updateUser(Number(req.params.id), req.body);

    if (!user) {
      throw new AppError("USER_NOT_FOUND", "Usuario no encontrado", 404);
    }

    res.json(user);
  };

  // DELETE /users/:id
  remove = async (req, res) => {
    const deleted = await this.#useCases.deleteUser(Number(req.params.id));

    if (!deleted) {
      throw new AppError("USER_NOT_FOUND", "Usuario no encontrado", 404);
    }

    res.status(204).send();
  };
}

export default UsersController;
