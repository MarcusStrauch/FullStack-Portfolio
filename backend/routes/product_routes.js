const productsRouter = require("express").Router();

const {
  checkProductId,
  getProducts,
  getProduct,
  getProductCategories,
} = require("../controllers/products_controller");

productsRouter.param("id", checkProductId);

productsRouter.route("/").get(getProducts);
productsRouter.route("/categories").get(getProductCategories)

productsRouter.route("/:id").get(getProduct);

module.exports = productsRouter;
