const { Model, DataTypes } = require("sequelize");

class Type extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsToMany(models.Product, {
      foreignKey: "type_id",
      through: "products_types",
      as: "products",
    });
  }
}

module.exports = Type;
