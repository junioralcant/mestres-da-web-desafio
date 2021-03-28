const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

const User = require("../models/User");
const Type = require("../models/Type");
const Size = require("../models/Size");
const Product = require("../models/Product");
const ProductsSize = require("../models/ProductsSize");
const Sale = require("../models/Sale");
const SalesProduct = require("../models/SalesProduct");

const connection = new Sequelize(dbConfig);

User.init(connection);
Type.init(connection);
Size.init(connection);
Product.init(connection);
ProductsSize.init(connection);
Sale.init(connection);
SalesProduct.init(connection);

Type.associate(connection.models);
Product.associate(connection.models);
Size.associate(connection.models);
Sale.associate(connection.models);

module.exports = connection;
