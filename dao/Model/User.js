import { DataTypes, Model } from "sequelize";
import sequelize from "../../connection/sequelize.js";

class User extends Model {}

User.init(
  {
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        len: [2, 100],
      },
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    rol: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: "lector",
    },
  },
  {
    sequelize,
    modelName: "User",
  },
);

export default User;
