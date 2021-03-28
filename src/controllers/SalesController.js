const Product = require("../models/Product");
const Sale = require("../models/Sale");
const Size = require("../models/Size");
const ProductsSize = require("../models/ProductsSize");
const SalesProduct = require("../models/SalesProduct");

class SalesController {
  async index(req, res) {
    const sales = await Sale.findAll({
      attributes: ["id"],
      include: [
        {
          association: "user",
          attributes: ["id", "name", "email"],
        },
        {
          model: Product,
          as: "products",
          attributes: ["id", "name"],
          through: { attributes: ["sku", "amount"] },
        },
      ],
    });

    return res.json(sales);
  }

  async store(req, res) {
    const { saleProducts } = req.body;

    let productData = false;

    await Promise.all(
      saleProducts.map((saleProduct) => {
        if (
          !saleProduct.productId ||
          !saleProduct.sizeId ||
          !saleProduct.amount
        ) {
          productData = true;
          return;
        }
      })
    );

    if (productData) {
      return res.status(400).json({
        error: "Os campos productId, sizeId  e amount são obrigatórios.",
      });
    }

    const sale = await Sale.create({ user_id: req.userId });

    await Promise.all(
      saleProducts.map(async (saleProduct) => {
        const product = await Product.findByPk(saleProduct.productId);
        const size = await Size.findOne({
          where: { id: saleProduct.sizeId },
        });

        if (product !== null) {
          await sale.addProduct(product);
        }

        const productsSize = await ProductsSize.findOne({
          where: {
            size_id: saleProduct.sizeId,
            productId: saleProduct.productId,
          },
        });

        if (productsSize.amount < saleProduct.amount) {
          await sale.destroy();

          return res.status(400).json({
            error:
              "Quantidade maior do que temos em estoque. Só temos " +
              productsSize.amount +
              " unidades do(a) " +
              product.name +
              " tamanho " +
              size.name,
          });
        }

        if (productsSize) {
          await SalesProduct.update(
            { sku: productsSize.sku, amount: saleProduct.amount },
            {
              where: { sale_id: sale.id, product_id: saleProduct.productId },
            }
          );

          product.amount -= saleProduct.amount;
          await product.save();

          productsSize.amount -= saleProduct.amount;
          await productsSize.save();
        }
      })
    );

    saleProducts.map(async (saleProduct) => {});

    return res.json();
  }
}

module.exports = new SalesController();
