const { Model, DataTypes } = require("sequelize");

class Size extends Model {
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
      foreignKey: "size_id",
      through: "products_sizes",
      as: "products",
    });
    this.belongsToMany(models.Sale, {
      foreignKey: "product_size_id",
      through: "sales_products",
      as: "sales",
    });
  }
}

module.exports = Size;
