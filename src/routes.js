const { Router } = require("express");
const UserController = require("./controllers/UserContoller");
const TypeController = require("./controllers/TypeController");
const SizeController = require("./controllers/SizeController");
const ProductController = require("./controllers/ProductController");
const ProductSizeController = require("./controllers/ProductSizeController");
const SessionController = require("./controllers/SessionController");

const routes = Router();
const middlewareAuth = require("./middleware/auth");
const middlewareAdmin = require("./middleware/administratorCheck");
const SalesController = require("./controllers/SalesController");

routes.post("/sessions", SessionController.store);

routes.post("/users", UserController.store);

routes.use(middlewareAuth);

routes.post("/sales", SalesController.store);

routes.use(middlewareAdmin);

routes.get("/sales", SalesController.index);

routes.get("/users", UserController.index);
routes.put("/users/:id", UserController.update);
routes.delete("/users/:id", UserController.destroy);

routes.get("/types", TypeController.index);
routes.post("/types", TypeController.store);
routes.put("/types/:id", TypeController.update);
routes.delete("/types/:id", TypeController.destroy);

routes.get("/sizes", SizeController.index);
routes.post("/sizes", SizeController.store);
routes.put("/sizes/:id", SizeController.update);
routes.delete("/sizes/:id", SizeController.destroy);

routes.get("/products", ProductController.index);
routes.post("/products", ProductController.store);
routes.put("/products/:id", ProductController.update);
routes.delete("/products/:id", ProductController.destroy);

routes.post("/productstypessizes/:id", ProductSizeController.store);
routes.put("/productstypessizes/:id", ProductSizeController.update);
routes.delete("/productstypessizes/:id", ProductSizeController.destroy);

module.exports = routes;
