const User = require("../models/User");

module.exports = async (req, res, next) => {
  const user = await User.findOne({ where: { id: req.userId } });

  try {
    if (user.administrator === false) {
      return res.status(400).json({
        message: "Só um administrador tem permissão para fazer esta ação.",
      });
    }
    return next();
  } catch (error) {
    console.log(error);
  }
};
