const createError = require("http-errors");
const authRouter = require("express").Router();
const passport = require("passport");
const { checkSchema } = require("express-validator");
const {
  signUp,
  checkNotAuthenticated,
  checkForSession,
  checkAuthenticated,
  processLogout,
  getCSRFToken,
  prepareLogin,
  finalizeLogin,
} = require("../controllers/auth_controller");

const { csrfSynchronisedProtection } = require("../config/csrf");

authRouter.route("/login").post(
  checkNotAuthenticated,
  checkSchema({
    username: { escape: true, isLength: { options: { min: 3, max: 30 } } },
    password: { isLength: { options: { min: 6, max: 100 } } },
  }),
  prepareLogin,
  (req, res, next) => {
    // eslint-disable-next-line consistent-return
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        return res.status(501).json({ ok: false, error: err });
      }
      if (info && !user) {
        return next(createError(401, "Unauthorized"));
      }
      if (user) {
        req.login(user, (logErr) => {
          if (logErr) return res.status(501).json({ ok: false, error: logErr });
          return res.json({ ok: true, loggedIn: true, user });
        });
      }
    })(req, res, next);
  },
  finalizeLogin
);

authRouter
  .route("/google")
  .get(passport.authenticate("google", { scope: ["profile"] }));

authRouter.route("/google/callback").get(
  passport.authenticate("google", {
    failureRedirect: "/login",
    successRedirect: process.env.CLIENT_HOMEPAGE,
  })
);

authRouter.route("/signup").post(
  checkSchema({
    userName: { escape: true, isLength: { options: { min: 3, max: 30 } } },
    firstName: {
      optional: true,
      escape: true,
      isLength: { options: { min: 3, max: 40 } },
    },
    lastName: {
      optional: true,
      escape: true,
      isLength: { options: { min: 3, max: 40 } },
    },
    email: {
      escape: true,
      isEmail: true,
    },
    password: { isLength: { options: { min: 6, max: 100 } } },
  }),
  signUp
);

authRouter.route("/authorizeSession").get(checkForSession);
authRouter.route("/getCSRFToken").get(getCSRFToken);

authRouter
  .route("/logout")
  .delete(checkAuthenticated, csrfSynchronisedProtection, processLogout);

module.exports = authRouter;
