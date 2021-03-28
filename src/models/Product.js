const { Model, DataTypes } = require("sequelize");

class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        price: DataTypes.FLOAT,
        amount: DataTypes.INTEGER,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsToMany(models.Type, {
      foreignKey: "product_id",
      through: "products_types",
      as: "types",
    });
    this.belongsToMany(models.Size, {
      foreignKey: "product_id",
      through: "products_sizes",
      as: "sizes",
    });
    this.belongsToMany(models.Sale, {
      foreignKey: "product_id",
      through: "sales_products",
      as: "sales",
    });
  }
}

module.exports = Product;
