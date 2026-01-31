const db = require("../db/index");

const tableName = "product";

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

const find = async (id) => {
  try {
    const result = await db.select().from(tableName).where("productId", id);

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
    const productProps = props;
    delete productProps.productId;
    const result = await db
      .insert(productProps)
      .from(tableName)
      .returning("productId");

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
    const result = await db.delete().from(tableName).where("productId", id);

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
    const productProps = props;
    delete productProps.productId;
    const result = await db
      .update(productProps)
      .from(tableName)
      .where("productId", id);

    if (result[0]) {
      return result[0];
    }

    return null;
  } catch (err) {
    throw new Error(err);
  }
};

const productModel = {
  findAll,
  find,
  create,
  remove,
  update,
};

module.exports = {
  productModel,
};
