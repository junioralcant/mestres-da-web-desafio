const jwt = require("jsonwebtoken");
const { promisify } = require("util");

module.exports = async (req, resp, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return resp.status(401).json({ error: "Token não encontrado" });
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = await promisify(jwt.verify)(token, "web-master");

    req.userId = decoded.id;

    return next();
  } catch (error) {
    return resp.status(401).json({ error: "Token invalido" });
  }
};
