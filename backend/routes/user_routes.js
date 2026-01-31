const userRouter = require("express").Router();

const {
  checkUserId,
  getUsers,
  getUser,
  updateUser,
  removeUser,
} = require("../controllers/users_controller");

userRouter.param("id", checkUserId);

userRouter.route("/").get(getUsers);

userRouter.route("/:id").get(getUser).put(updateUser).delete(removeUser);

module.exports = userRouter;
