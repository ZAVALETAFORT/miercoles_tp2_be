import { z } from "zod";

const fields = {
  // Nombre obligatorio, mínimo 2 caracteres
  nombre: z.string().min(2, "mínimo 2 caracteres"),
  email: z.email("El email no es válido"),
  rol: z.string().default("lector"),
};

// Validación para crear usuarios (POST)
const createUserSchema = z.object({
  nombre: fields.nombre,
  email: fields.email,
  rol: fields.rol,
});

//Define `updateUserSchema` (todos los campos opcionales) y `userIdParamSchema`.
// Validación para actualizar usuarios (PUT)
const updateUserSchema = z.object({
  nombre: fields.nombre.optional(),
  email: fields.email.optional(),
  rol: z.string().optional(),
});

// Validación del ID recibido por URL
const userIdParamSchema = z.object({
  id: z.coerce.number().int().positive(),
});

// Exportamos los tres esquemas
export { createUserSchema, updateUserSchema, userIdParamSchema };
