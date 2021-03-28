const Product = require("../models/Product");
const Type = require("../models/Type");
const Size = require("../models/Size");
const ProductsSize = require("../models/ProductsSize");

module.exports = {
  async index(req, res) {
    const products = await Product.findAll({
      attributes: ["id", "name", "description", "price", "amount"],
      include: [
        {
          model: Type,
          as: "types",
          attributes: ["id", "name"],
          through: { attributes: [] },
        },

        {
          model: Size,
          as: "sizes",
          attributes: ["id", "name"],
          through: { attributes: ["sku", "amount"] },
        },
      ],
    });

    return res.json(products);
  },

  async store(req, res) {
    const { name, description, price, types, sizes } = req.body;

    if (!name || !description || !price || !types || !sizes) {
      return res
        .status(400)
        .json({ message: "Preencha todos os campos para continuar!" });
    }

    const product = await Product.create({
      name,
      description,
      price,
      amount: 0,
    });

    let amountAll = 0;
    let sku = false;
    messageSku = "";

    await Promise.all(
      sizes.map(async (result) => {
        const productsSizeSkuSearch = await ProductsSize.findOne({
          where: { sku: result.sku },
        });

        if (productsSizeSkuSearch) {
          sku = true;
          messageSku =
            "Ops, Indentificação SKU já cadastrada " + result.sku + ".";
          return;
        }
      })
    );

    if (sku) {
      await product.destroy();

      return res.status(400).json({
        message: messageSku,
      });
    }

    types.map(async (id) => {
      const type = await Type.findByPk(id);
      if (type !== null) {
        await product.addType(type);
      }
    });

    await Promise.all(
      sizes.map(async (result) => {
        const size = await Size.findByPk(result.sizeId);
        if (size !== null) {
          await product.addSize(size);

          await ProductsSize.update(
            { amount: result.amount, sku: result.sku },
            {
              where: { productId: product.id, sizeId: result.sizeId },
            }
          );
          amountAll += result.amount;
        }
      })
    );

    product.amount = amountAll;
    await product.save();

    return res.json(product);
  },

  async update(req, res) {
    const { id } = req.params;
    const { amount } = req.body;

    if (amount)
      return res.status(400).json({
        message:
          "Ops, não é possível alterar a quantidade do produto diretamente. Ou você altera na variação do protudo ou castre uma nava.",
      });

    await Product.update(req.body, { where: { id: id } });

    return res.send();
  },

  async destroy(req, res) {
    const { id } = req.params;

    await Product.destroy({ where: { id: id } });

    return res.send();
  },
};
