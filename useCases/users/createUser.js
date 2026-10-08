import AppError from "../../errors/AppError.js";

// Comprueba que el email no esté registrado antes de crear
async function createUser(data, dao) {
  const existingUser = await dao.getByEmail(data.email);

  if (existingUser) {
    throw new AppError(
      "EMAIL_DUPLICATED",
      "Ese email ya está registrado",
      409
    );
  }

  return dao.save(data);
}

export default createUser;