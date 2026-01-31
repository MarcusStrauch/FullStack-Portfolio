const createError = require("http-errors");
const validator = require("validator");
const { matchedData, validationResult } = require("express-validator");
const { cartModel } = require("../models/cart");
const { orderModel } = require("../models/order");
const { orderProductModel } = require("../models/orderProduct");
const { cartProductModel } = require("../models/cartProduct");

const checkCartId = async (req, res, next, cartId) => {
  try {
    if (!validator.isInt(cartId)) {
      throw createError(400, "Invalid ID");
    }
    const cart = await cartModel.findByCartId(cartId);
    if (!cart) {
      throw createError(404, "Resource not found");
    }
    if (cart.userId === req.user.userId) {
      req.cart = cart;
      next();
    } else {
      throw createError(401, "Unauthorized");
    }
  } catch (err) {
    next(err);
  }
};

const checkCartProductId = async (req, res, next, cartProductId) => {
  try {
    if (!validator.isInt(cartProductId)) {
      throw createError(400, "Invalid ID");
    }
    const cartProduct = await cartProductModel.findByCartProductId(
      cartProductId
    );
    if (!cartProduct) {
      throw createError(404, "Resource not found");
    }
    if (req.cart.userId === req.user.userId) {
      req.cartProduct = cartProduct;
      next();
    } else {
      throw createError(401, "Unauthorized");
    }
  } catch (err) {
    next(err);
  }
};

const getAllCarts = async (req, res, next) => {
  try {
    const cartObj = await cartModel.findAll();
    res.json({
      ok: true,
      message: "Carts retrived",
      cartObj,
    });
  } catch (err) {
    next(err);
  }
};

const getCarts = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const cartsArr = await cartModel.findByUserId(userId);
    if (!cartsArr) {
      return res.json({
        ok: true,
        message: "No Carts found",
      });
    }
    const cartsProductsArr = await Promise.all(
      cartsArr.map(async (cart) => {
        const cartProducts = await cartProductModel.findByCartId(cart.cartId);
        return {
          ...cart,
          products: cartProducts || [],
        };
      })
    );
    return res.json({
      ok: true,
      message: "Orders retrieved",
      cartsProductsArr,
    });
  } catch (err) {
    return next(err);
  }
};

const postCart = async (req, res, next) => {
  const props = req.body;

  try {
    const cart = await cartModel.create(props);
    res.json({
      ok: true,
      message: "Carts created",
      cart,
    });
  } catch (err) {
    next(err);
  }
};

const getCart = async (req, res, next) => {
  try {
    res.json({
      ok: true,
      message: "Cart retrieved",
      cart: req.cart,
    });
  } catch (err) {
    next(err);
  }
};

const updateCart = async (req, res, next) => {
  const props = req.body.cart;
  const { cartId } = req.cart;

  try {
    const cart = await cartModel.update(props, cartId);
    res.json({
      ok: true,
      message: "Carts updated",
      cart,
    });
  } catch (err) {
    next(err);
  }
};

const removeCart = async (req, res, next) => {
  try {
    const { cartId } = req.cart;
    const remove = await cartModel.remove(cartId);
    res.json({
      ok: true,
      message: "Cart removed",
      remove,
    });
  } catch (err) {
    next(err);
  }
};

const getCartItems = async (req, res, next) => {
  try {
    const { cartId } = req.cart;
    const cartItems = await cartProductModel.findAll(cartId);
    res.json({
      ok: true,
      message: "Cart items retrived",
      cartItems,
    });
  } catch (err) {
    next(err);
  }
};

const postCartItems = async (req, res, next) => {
  try {
    const { cartId } = req.cart;
    const result = validationResult(req);
    if (result.isEmpty()) {
      const data = matchedData(req);
      const itemsToAdd = data.items.map((item) => ({ ...item, cartId }));
      const cartItems = await cartProductModel.addItemsToCart(itemsToAdd);
      res.json({
        ok: true,
        message: "Items added to cart",
        cartItems,
      });
    } else {
      throw createError(400, "Bad Request");
    }
  } catch (err) {
    next(err);
  }
};

const updateCartItem = async (req, res, next) => {
  try {
    const { cartProductId } = req.cartProduct;
    const result = validationResult(req);
    if (result.isEmpty()) {
      const data = matchedData(req);
      const cartItems = await cartProductModel.updateOneByCartProductId(
        data,
        cartProductId
      );
      res.json({
        ok: true,
        message: "Item updated",
        cartItems,
      });
    } else {
      throw createError(400, "Bad Request");
    }
  } catch (err) {
    next(err);
  }
};

const removeCartItem = async (req, res, next) => {
  try {
    const { cartProductId } = req.cartProduct;
    await cartProductModel.removeOneByCartProductId(cartProductId);
    res.json({
      ok: true,
      message: "Items removed from cart",
    });
  } catch (err) {
    next(err);
  }
};

const checkoutCart = async (req, res, next) => {
  try {
    const { cartId } = req.cart;
    // const props = req.body.payment_details;
    const { userId } = req.user;

    const cartItems = await cartProductModel.findByCartId(cartId);
    if (cartItems.length === 0) {
      throw createError(401, "Cart is empty, can not check out");
    }

    const total = cartItems.reduce(
      (subTotal, item) =>
        subTotal + Number(item.unitPrice) * Number(item.quantity),
      0
    );

    const orderCreated = await orderModel.create({
      userId,
      total,
      status: "pending",
    });
    if (!orderCreated) {
      throw createError(401, "Invalid user id");
    }

    const orderItems = cartItems.map((item) => ({
      orderId: orderCreated.orderId,
      productId: item.productId,
      quantity: item.quantity,
    }));

    await orderProductModel.addItemsToOrder(orderItems);

    // await cartProductModel.removeAllByCartId(cartId);
    await cartModel.remove(cartId);

    res.json({
      ok: true,
      message: "Order placed",
      orderCreated,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  checkCartId,
  checkCartProductId,
  getAllCarts,
  getCarts,
  postCart,
  getCart,
  updateCart,
  removeCart,
  getCartItems,
  postCartItems,
  updateCartItem,
  removeCartItem,
  checkoutCart,
};
