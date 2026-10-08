import { DataTypes, Model } from "sequelize";
import sequelize from "../../connection/sequelize.js";

class User extends Model { }

User.init({
    username: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            len: [3, 100],
        }
    },
    mail: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            len: [6, 100]
        }
    }
}, {
    sequelize,
    modelName: "User"
})

export default User;