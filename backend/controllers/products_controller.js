const createError = require("http-errors");
const validator = require("validator");
const { productModel } = require("../models/product");
const { productCategoryModel } = require("../models/productCategory");

const checkProductId = async (req, res, next, id) => {
  try {
    if (!validator.isInt(id)) {
      throw createError(400, "Invalid ID");
    }
    const product = await productModel.find(id);
    if (!product) {
      throw createError(404, "Resource not found");
    }
    req.product = product;
    next();
  } catch (err) {
    next(err);
  }
};

const getProducts = async (req, res, next) => {
  try {
    const productArr = await productModel.findAll();
    res.json({
      ok: true,
      message: "Products retrieved",
      productArr,
    });
  } catch (err) {
    next(err);
  }
};

const getProduct = async (req, res, next) => {
  try {
    res.json({
      ok: true,
      message: "Product retrieved",
      order: req.product,
    });
  } catch (err) {
    next(err);
  }
};

const postProduct = async (req, res, next) => {
  const props = req.body.product;

  try {
    const product = await productModel.create(props);
    res.json({
      ok: true,
      message: "Product created",
      product,
    });
  } catch (err) {
    next(err);
  }
};

const updateProduct = async (req, res, next) => {
  const props = req.body.product;
  const { productId } = req.product;

  try {
    const product = await productModel.update(props, productId);
    res.json({
      ok: true,
      message: "Product updated",
      product,
    });
  } catch (err) {
    next(err);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { productId } = req.product;
    const removed = await productModel.remove(productId);
    res.json({
      ok: true,
      message: "Product removed",
      removed,
    });
  } catch (err) {
    next(err);
  }
};

const getProductCategories = async (req, res, next) => {
  try {
    const productCatArr = await productCategoryModel.findAll();
    res.json({
      ok: true,
      message: "Product categories retrieved",
      productCatArr,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  checkProductId,
  getProducts,
  postProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  getProductCategories,
};
