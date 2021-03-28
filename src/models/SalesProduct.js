const { Model, DataTypes } = require("sequelize");

class SalesProduct extends Model {
  static init(sequelize) {
    super.init(
      {
        sku: DataTypes.STRING,
        amount: DataTypes.INTEGER,
      },
      {
        sequelize,
      }
    );
  }
}

module.exports = SalesProduct;
