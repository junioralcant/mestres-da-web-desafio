const { Model, DataTypes } = require("sequelize");

class ProductsSize extends Model {
  static init(sequelize) {
    super.init(
      {
        productId: DataTypes.INTEGER,
        sizeId: DataTypes.INTEGER,
        amount: DataTypes.INTEGER,
        sku: DataTypes.STRING,
      },
      {
        sequelize,
      }
    );
  }
}

module.exports = ProductsSize;
