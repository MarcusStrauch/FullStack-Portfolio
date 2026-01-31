const db = require("../db/index");

const tableName = "cartProduct";

const findAll = async () => {
  try {
    const result = await db.select().from(tableName);

    if (result.length) {
      return result;
    }

    return null;
  } catch (err) {
    throw new Error(err);
  }
};

const findByCartId = async (cartId) => {
  try {
    const result = await db
      .select()
      .from("cartProduct")
      .leftJoin("product", "cartProduct.productId", "product.productId")
      .where("cartId", cartId);

    if (result.length) {
      return result;
    }

    return null;
  } catch (err) {
    throw new Error(err);
  }
};

const findByCartProductId = async (cartProductId) => {
  try {
    const result = await db
      .select()
      .from("cartProduct")
      .innerJoin("product", "cartProduct.productId", "product.productId")
      .where("cartProductId", cartProductId);

    if (result[0]) {
      return result[0];
    }

    return null;
  } catch (err) {
    throw new Error(err);
  }
};

const addItemsToCart = async (itemsToAdd) => {
  try {
    const result = await db(tableName)
      .insert(itemsToAdd, ["quantity", "cartProductId", "productId"])
      .onConflict(["cartId", "productId"])
      .merge("quantity");

    if (result.length) {
      return result;
    }

    return null;
  } catch (err) {
    throw new Error(err);
  }
};

const updateOneByCartProductId = async (cartProductId, data) => {
  try {
    const result = await db
      .update(data)
      .from(tableName)
      .where("cartProductId", cartProductId);
    if (result.length) {
      return result;
    }

    return null;
  } catch (err) {
    throw new Error(err);
  }
};

const removeOneByCartProductId = async (cartProductId) => {
  try {
    const result = await db
      .delete()
      .from(tableName)
      .where("cartProductId", cartProductId);
    if (result.length) {
      return result;
    }

    return null;
  } catch (err) {
    throw new Error(err);
  }
};

const removeAllByCartId = async (cartId) => {
  try {
    const result = await db.delete().from(tableName).where("cartId", cartId);
    if (result.length) {
      return result;
    }

    return null;
  } catch (err) {
    throw new Error(err);
  }
};

const cartProductModel = {
  findAll,
  findByCartId,
  addItemsToCart,
  findByCartProductId,
  updateOneByCartProductId,
  removeOneByCartProductId,
  removeAllByCartId,
};

module.exports = {
  cartProductModel,
};
