const db = require("../db/index");

const tableName = "order";

const findAll = async () => {
  try {
    const result = await db
      .select("orderId", "userId", "order_time")
      .from(tableName);

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

const findByOrderId = async (orderId) => {
  try {
    const result = await db.select().from(tableName).where("orderId", orderId);

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
    const orderProps = props;
    delete orderProps.orderId;
    const result = await db(tableName).insert(props).returning("orderId");

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
    const result = await db.delete().from(tableName).where("orderId", id);

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
    const orderProps = props;
    delete orderProps.orderId;
    const result = await db.update(props).from(tableName).where("orderId", id);

    if (result[0]) {
      return result[0];
    }

    return null;
  } catch (err) {
    throw new Error(err);
  }
};

const orderModel = {
  findAll,
  findByUserId,
  findByOrderId,
  create,
  remove,
  update,
};

module.exports = {
  orderModel,
};
