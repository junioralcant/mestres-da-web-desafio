const Product = require("../models/Product");
const Size = require("../models/Size");
const Type = require("../models/Type");
const ProductsSize = require("../models/ProductsSize");

module.exports = {
  async store(req, res) {
    const { id } = req.params;
    const { typeId, sizeProperties } = req.body;

    if (
      !sizeProperties.sizeId ||
      !sizeProperties.amount ||
      !sizeProperties.sku
    ) {
      return res
        .status(400)
        .json({ message: "Os campos sizeId, amount e sku são obrigatórios." });
    }

    const product = await Product.findByPk(id);

    if (typeId) {
      const type = await Type.findByPk(typeId);

      if (!type) {
        return res.status(400).json({ message: "Categoria não encontrada." });
      }

      await product.addType(type);
    }

    if (sizeProperties) {
      const size = await Size.findByPk(sizeProperties.sizeId);

      if (!size) {
        return res.status(400).json({ message: "Tamanho não encontrado." });
      }

      const productsSizeSkuSearch = await ProductsSize.findOne({
        where: { sku: sizeProperties.sku },
      });

      if (productsSizeSkuSearch) {
        return res.status(400).json({
          message:
            "Indentificação SKU já cadastrada " + sizeProperties.sku + ".",
        });
      }

      await product.addSize(size);

      await ProductsSize.update(
        { amount: sizeProperties.amount, sku: sizeProperties.sku },
        {
          where: { productId: product.id, sizeId: sizeProperties.sizeId },
        }
      );

      product.amount += sizeProperties.amount;
      await product.save();
    }

    return res.send();
  },

  async update(req, res) {
    const { id } = req.params;
    const { typeId, sizeProperties } = req.body;

    const product = await Product.findByPk(id);

    if (typeId) {
      const type = await Type.findByPk(typeId);

      if (!type) {
        return res.status(400).json({ message: "Categoria não encontrada." });
      }

      await product.addType(type);
    }

    if (sizeProperties) {
      if (!sizeProperties.sizeId) {
        return res.status(400).json({ message: "Campo SizeId é obrigatório." });
      }
      const size = await Size.findByPk(sizeProperties.sizeId);

      const productSize = await ProductsSize.findOne({
        where: { size_id: sizeProperties.sizeId, product_id: product.id },
      });

      if (!size) {
        return res.status(400).json({ message: "Tamanho não encontrado." });
      }

      if (!productSize) {
        return res
          .status(400)
          .json({ message: "Tamanho ou produto não encontrado." });
      }

      if (sizeProperties.sku !== null) {
        const productSizeSku = await ProductsSize.findOne({
          where: { sku: sizeProperties.sku },
        });

        if (productSizeSku) {
          return res.status(400).json({
            message:
              "Indentificação SKU já cadastrada " + sizeProperties.sku + ".",
          });
        }

        await ProductsSize.update(
          { sku: sizeProperties.sku },
          { where: { product_id: product.id, size_id: sizeProperties.sizeId } }
        );
      }

      if (sizeProperties.amount) {
        await ProductsSize.update(
          { amount: sizeProperties.amount },
          {
            where: { product_id: product.id, size_id: sizeProperties.sizeId },
          }
        );

        const subProductSize = sizeProperties.amount - productSize.amount;

        if (subProductSize > 0) {
          product.amount += subProductSize;
          await product.save();
        }

        if (subProductSize < 0) {
          product.amount -= subProductSize;
          await product.save();
        }
      }
    }

    return res.send();
  },

  async destroy(req, res) {
    const { id } = req.params;
    const { typeId, sizeId } = req.body;

    const product = await Product.findByPk(id);

    if (typeId) {
      const type = await Type.findByPk(typeId);
      await product.removeType(type);
    }

    if (sizeId) {
      const productsSize = await ProductsSize.findOne({
        where: { productId: product.id, sizeId: sizeId },
      });

      const size = await Size.findByPk(sizeId);
      await product.removeSize(size);

      product.amount -= productsSize.amount;
      await product.save();
    }

    return res.send();
  },
};
