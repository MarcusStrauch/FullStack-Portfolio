const ordersRouter = require("express").Router();
const { csrfSynchronisedProtection } = require("../config/csrf");

const {
  getAllOrders,
  checkOrderId,
  getOrders,
  updateOrder,
  getOrder,
  removeOrder,
  postOrderItems,
  getOrderItems,
} = require("../controllers/orders_controller");

ordersRouter.param("id", checkOrderId);

ordersRouter.route("/").get(getAllOrders);

ordersRouter.route("/user").get(getOrders);

ordersRouter
  .route("/:id")
  .put(csrfSynchronisedProtection, updateOrder)
  .get(getOrder)
  .delete(csrfSynchronisedProtection, removeOrder);

ordersRouter.route("/:id/items").post(postOrderItems).get(getOrderItems);

module.exports = ordersRouter;
