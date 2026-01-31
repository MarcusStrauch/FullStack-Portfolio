const db = require("../db/index");

const tableName = "cart";

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

const findByUserId = async (userId) => {
  try {
    const result = await db.select().from(tableName).where("userId", userId);
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
    const result = await db.select().from(tableName).where("cartId", cartId);

    if (result[0]) {
      return result[0];
    }

    return null;
  } catch (err) {
    throw new Error(err);
  }
};

const create = async (props) => {
  try {
    const cartProps = props;
    delete cartProps.cartId;
    const result = await db(tableName).insert(cartProps).returning("cartId");

    if (result[0]) {
      return result[0];
    }

    return null;
  } catch (err) {
    throw new Error(err);
  }
};

const remove = async (id) => {
  try {
    const result = await db.delete().from(tableName).where("cartId", id);

    if (result) {
      return result;
    }

    return null;
  } catch (err) {
    throw new Error(err);
  }
};

const update = async (props, id) => {
  try {
    const cartProps = props;
    delete cartProps.cartId;
    const result = await db.update(props).from(tableName).where("cartId", id);

    if (result[0]) {
      return result[0];
    }

    return null;
  } catch (err) {
    throw new Error(err);
  }
};

const cartModel = {
  findAll,
  findByUserId,
  findByCartId,
  create,
  remove,
  update,
};

module.exports = {
  cartModel,
};
