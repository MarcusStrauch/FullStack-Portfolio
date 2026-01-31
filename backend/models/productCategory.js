const db = require("../db/index");

const tableName = "productCategory";

const findAll = async () => {
  try {
    const result = await db
      .select()
      .from(tableName)
      .orderBy("productCategoryId");

    if (result.length) {
      return result;
    }

    return null;
  } catch (err) {
    throw new Error(err);
  }
};

const find = async (productCategoryId) => {
  try {
    const result = await db
      .select()
      .from(tableName)
      .where("productCategoryId", productCategoryId);

    if (result[0]) {
      return result[0];
    }

    return null;
  } catch (err) {
    throw new Error(err);
  }
};

const productCategoryModel = {
  findAll,
  find,
};

module.exports = {
  productCategoryModel,
};
