const { Model, DataTypes } = require("sequelize");

class Sale extends Model {
  static init(sequelize) {
    super.init(
      {},
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user",
    });
    this.belongsToMany(models.Product, {
      foreignKey: "sale_id",
      through: "sales_products",
      as: "products",
    });
  }
}

module.exports = Sale;
