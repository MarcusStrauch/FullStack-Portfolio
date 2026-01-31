const cartRouter = require("express").Router();
const { checkSchema } = require("express-validator");
const { csrfSynchronisedProtection } = require("../config/csrf");

const {
  checkCartId,
  getAllCarts,
  getCarts,
  postCart,
  getCart,
  updateCart,
  removeCart,
  getCartItems,
  updateCartItem,
  removeCartItem,
  postCartItems,
  checkoutCart,
  checkCartProductId,
} = require("../controllers/carts_controller");

cartRouter.param("cartId", checkCartId);
cartRouter.param("cartProductId", checkCartProductId);

cartRouter.route("/").get(getAllCarts);

cartRouter
  .route("/user")
  .get(getCarts)
  .post(csrfSynchronisedProtection, postCart);

cartRouter
  .route("/:cartId")
  .get(getCart)
  .put(csrfSynchronisedProtection, updateCart)
  .delete(csrfSynchronisedProtection, removeCart);

cartRouter
  .route("/:cartId/items")
  .get(getCartItems)
  .post(
    csrfSynchronisedProtection,
    checkSchema({
      items: { isArray: { bail: true, options: { min: 1, max: 100 } } },
      "items.*.productId": {
        isInt: true,
      },
      "items.*.quantity": {
        isInt: { options: { min: 1, max: 999 } },
      },
    }),
    postCartItems
  );

cartRouter
  .route("/:cartId/items/:cartProductId")
  .get(getCartItems)
  .put(
    csrfSynchronisedProtection,
    checkSchema({
      quantity: {
        isInt: { options: { min: 1, max: 999 } },
      },
    }),
    updateCartItem
  )
  .delete(removeCartItem);

cartRouter
  .route("/:cartId/checkout")
  .post(csrfSynchronisedProtection, checkoutCart);

module.exports = cartRouter;
