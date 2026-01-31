const createError = require("http-errors");
const validator = require("validator");
const { orderModel } = require("../models/order");
const { orderProductModel } = require("../models/orderProduct");

const checkOrderId = async (req, res, next, id) => {
  try {
    if (!validator.isInt(id)) {
      throw createError(400, "Invalid ID");
    }
    const order = await orderModel.find(id);
    if (!order) {
      throw createError(404, "Resource not found");
    }
    if (order.userId === req.user.userId) {
      req.order = order;
      next();
    } else {
      throw createError(401, "Unauthorized");
    }
  } catch (err) {
    next(err);
  }
};

const postOrders = async (req, res, next) => {
  const props = req.body.order;

  try {
    const order = await orderModel.create(props);
    res.json({
      ok: true,
      message: "Order placed",
      order,
    });
  } catch (err) {
    next(err);
  }
};

const getAllOrders = async (req, res, next) => {
  try {
    const orderObj = await orderModel.findAll();
    res.json({
      ok: true,
      message: "Orders retrieved",
      orderObj,
    });
  } catch (err) {
    next(err);
  }
};

const getOrders = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const orderArr = await orderModel.findByUserId(userId);
    if (!orderArr) {
      return res.json({
        ok: true,
        message: "No Orders found",
      });
    }
    const orderProductArr = await Promise.all(
      orderArr.map(async (order) => {
        const orderProducts = await orderProductModel.findProductsByOrderId(
          order.orderId
        );
        return {
          ...order,
          products: orderProducts,
        };
      })
    );
    return res.json({
      ok: true,
      message: "Orders retrieved",
      orderProductArr,
    });
  } catch (err) {
    return next(err);
  }
};

const updateOrder = async (req, res, next) => {
  const props = req.body.order;
  const { orderId } = req.order;

  try {
    const order = await orderModel.update(props, orderId);
    res.json({
      ok: true,
      message: "Order updated",
      order,
    });
  } catch (err) {
    next(err);
  }
};

const getOrder = async (req, res, next) => {
  try {
    res.json({
      ok: true,
      message: "Order retrieved",
      order: req.order,
    });
  } catch (err) {
    next(err);
  }
};

const removeOrder = async (req, res, next) => {
  const { orderId } = req.order;

  try {
    const removed = await orderModel.remove(orderId);
    res.json({
      ok: true,
      message: "Order removed",
      removed,
    });
  } catch (err) {
    next(err);
  }
};

const postOrderItems = async (req, res, next) => {
  const props = req.body.order_items;
  const { orderId } = req.order;

  try {
    const placedOrder = await orderProductModel.create(props, orderId);
    res.json({
      ok: true,
      message: "Items added to order",
      placedOrder,
    });
  } catch (err) {
    next(err);
  }
};

const getOrderItems = async (req, res, next) => {
  const { orderId } = req.order;

  try {
    const orderItems = await orderProductModel.findAll(orderId);
    res.json({
      ok: true,
      message: "Order items retrieved",
      orderItems,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllOrders,
  checkOrderId,
  postOrders,
  getOrders,
  updateOrder,
  getOrder,
  removeOrder,
  postOrderItems,
  getOrderItems,
};
