const Size = require("../models/Size");

module.exports = {
  async index(req, res) {
    const sizes = await Size.findAll();

    return res.json(sizes);
  },

  async store(req, res) {
    const { name } = req.body;

    const size = await Size.create({ name });

    return res.json(size);
  },

  async update(req, res) {
    const { id } = req.params;

    await Size.update(req.body, { where: { id: id } });

    return res.send();
  },

  async destroy(req, res) {
    const { id } = req.params;

    await Size.destroy({ where: { id: id } });

    return res.send();
  },
};
