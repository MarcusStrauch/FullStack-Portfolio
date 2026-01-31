const createError = require("http-errors");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const { matchedData, validationResult } = require("express-validator");
const { userModel } = require("../models/user");
const { generateToken } = require("../config/csrf");

const SALT_ROUNDS = 10;
const hashPassword = (password) => bcrypt.hash(password, SALT_ROUNDS);

const signUp = async (req, res, next) => {
  try {
    const result = validationResult(req);
    if (result.isEmpty()) {
      const data = matchedData(req);
      const { email, password } = data;

      const emailCheck = await userModel.findByEmail(email);
      if (emailCheck) {
        throw createError(409, "This E-Mail is already in use. Plase log in.");
      }

      const newUuid = uuidv4();
      const hashedPw = await hashPassword(password);

      const newUser = await userModel.create({
        ...data,
        userId: newUuid,
        password: hashedPw,
        role: "user",
      });
      res.json({
        ok: true,
        message: "User created",
        newUser,
      });
    } else {
      throw createError(400, "Bad Request");
    }
  } catch (err) {
    next(err);
  }
};

const checkNotAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next();
  }
  return next(createError(404, "Already logged in"));
};

const checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return next(createError(401, "Not logged in"));
};

const checkForSession = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.json({ ok: true, loggedIn: true, user: req.user });
  }
  if (!req.isAuthenticated()) {
    return res.json({ ok: true, loggedIn: false });
  }
  return next(createError(500, "Unexpected error in session check"));
};

const processLogout = (req, res, next) => {
  if (req.isAuthenticated()) {
    req.logOut((err) => {
      if (err) {
        return res.status(500).send("Error while logging out");
      }
      return null;
    });
    return res.json({ ok: true, loggedIn: false });
  }
  return next(createError(401, "Permission denied"));
};

const getCSRFToken = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.json({ token: generateToken(req, true), ok: true });
  }
  return next(createError(401, "Permission denied"));
};

const prepareLogin = (req, res, next) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    return next();
  }
  return next(createError(403, "Invalid passowrd or username"));
};

const finalizeLogin = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.json({ loggedIn: true, ok: true, user: req.user });
  }
  return next(createError(403, "Not logged in"));
};

module.exports = {
  signUp,
  checkAuthenticated,
  checkNotAuthenticated,
  checkForSession,
  processLogout,
  getCSRFToken,
  prepareLogin,
  finalizeLogin,
};
