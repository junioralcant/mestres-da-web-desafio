const User = require("../models/User");
module.exports = {
  async index(req, res) {
    const users = await User.findAll();

    return res.json(users);
  },

  async store(req, res) {
    const { name, email, password, administrator } = req.body;

    const user = await User.create({ name, email, password, administrator });

    return res.json(user);
  },

  async update(req, res) {
    const { id } = req.params;

    await User.update(req.body, { where: { id: id } });

    return res.send();
  },

  async destroy(req, res) {
    const { id } = req.params;

    await User.destroy({ where: { id: id } });

    return res.send();
  },
};
