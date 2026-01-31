const db = require("../db/index");

const tableName = "orderProduct";

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

const findProductsByOrderId = async (id) => {
  try {
    const result = await db
      .select()
      .from("orderProduct")
      .leftJoin("product", "orderProduct.productId", "product.productId")
      .where("orderId", id);

    if (result.length) {
      return result;
    }

    return null;
  } catch (err) {
    throw new Error(err);
  }
};

const addItemsToOrder = async (props) => {
  try {
    const result = await db(tableName).insert(props);

    if (result.length) {
      return result;
    }

    return null;
  } catch (err) {
    throw new Error(err);
  }
};

const orderProductModel = {
  findAll,
  findProductsByOrderId,
  addItemsToOrder,
};

module.exports = {
  orderProductModel,
};
