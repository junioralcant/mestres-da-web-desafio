const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const authConfig = require("../config/authConfig");

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        administrator: DataTypes.BOOLEAN,
      },
      {
        hooks: {
          beforeCreate: async (user, options) => {
            user.password = await bcrypt.hash(user.password, 8);
          },
        },
        sequelize,
      }
    );
  }
}

User.prototype.compareHash = function (password) {
  return bcrypt.compare(password, this.password);
};

User.prototype.generateToken = ({ id }) => {
  return jwt.sign({ id }, authConfig.secret, {
    expiresIn: authConfig.ttl,
  });
};

module.exports = User;
