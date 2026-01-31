const createError = require("http-errors");
const validator = require("validator");
const { userModel } = require("../models/user");

const checkUserId = async (req, res, next, id) => {
  try {
    if (!validator.isUUID(id, "4")) {
      throw createError(400, "Invalid ID");
    }
    const user = await userModel.find(id);
    if (!user) {
      throw createError(404, "Resource not found");
    }
    if (user.userId === req.user.userId) {
      req.userObj = user;
      next();
    } else {
      throw createError(401, "Unauthorized");
    }
  } catch (err) {
    next(err);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const users = await userModel.findAll();
    res.json({
      ok: true,
      message: "Users retrieved",
      users,
    });
  } catch (err) {
    next(err);
  }
};

const getUser = async (req, res, next) => {
  try {
    res.json({
      ok: true,
      message: "User retrieved",
      user: req.userObj,
    });
  } catch (err) {
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  const props = req.body.user;
  const { userId } = req.userObj;

  try {
    const user = await userModel.update(props, userId);
    res.json({
      ok: true,
      message: "User updated",
      user,
    });
  } catch (err) {
    next(err);
  }
};

const removeUser = async (req, res, next) => {
  const { userId } = req.userObj;

  try {
    const removed = await userModel.remove(userId);
    res.json({
      ok: true,
      message: "User removed",
      removed,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  checkUserId,
  getUsers,
  getUser,
  updateUser,
  removeUser,
};
