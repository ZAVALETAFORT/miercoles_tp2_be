
import express from "express";
import validate, { validateParams } from "../middlewares/validate.js";

import {
  createUserSchema,
  updateUserSchema,
  userIdParamSchema,
} from "../schemas/userSchema.js";

// Factory que recibe el controlador de usuarios
function createUsersRouter(controller) {
  const router = express.Router();

  // Listar usuarios
  router.get("/", controller.list);

  // Buscar usuario por ID
  router.get("/:id", validateParams(userIdParamSchema), controller.get);

  // Crear usuario validando los datos
  router.post("/", validate(createUserSchema), controller.create);

  // Actualizar usuario
  router.put("/:id", validateParams(userIdParamSchema), validate(updateUserSchema), controller.update);

  // Eliminar usuario
  router.delete("/:id", validateParams(userIdParamSchema), controller.remove);

  return router;
}

export default createUsersRouter;
