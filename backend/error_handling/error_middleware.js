const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const FORBIDDEN = 403;
const CONFLICT = 409;
const NOT_FOUND = 404;
const UNPROCESSABLE = 422;
const GENERIC_ERROR = 500;

const unauthorized = (err, req, res, next) => {
  if (err.status !== UNAUTHORIZED) return next(err);

  return res.status(UNAUTHORIZED).send({
    ok: false,
    message: err.message || "Unauthorized",
  });
};

const forbidden = (err, req, res, next) => {
  if (err.status !== FORBIDDEN) return next(err);

  return res.status(FORBIDDEN).send({
    ok: false,
    message: err.message || "Forbidden",
  });
};

const conflict = (err, req, res, next) => {
  if (err.status !== CONFLICT) return next(err);

  return res.status(CONFLICT).send({
    ok: false,
    message: err.message || "Conflict",
  });
};

const badRequest = (err, req, res, next) => {
  if (err.status !== BAD_REQUEST) return next(err);

  return res.status(BAD_REQUEST).send({
    ok: false,
    message: err.message || "Bad Request",
  });
};

const unprocessable = (err, req, res, next) => {
  if (err.status !== UNPROCESSABLE) return next(err);

  return res.status(UNPROCESSABLE).send({
    ok: false,
    message: err.message || "Unprocessable entity",
  });
};

const notFound = (err, req, res, next) => {
  if (err.status !== NOT_FOUND) return next(err);

  return res.status(NOT_FOUND).send({
    ok: false,
    message: err.message || "The requested resource could not be found",
  });
};

// eslint-disable-next-line no-unused-vars
const genericError = (err, req, res, next) => {
  console.log(err);
  res.status(GENERIC_ERROR).send({
    ok: false,
    message: "Internal server error",
  });
};
const catchall = (req, res) =>
  res.status(NOT_FOUND).send({
    ok: false,
    message: "The requested resource could not be found",
  });

const exportables = {
  unauthorized,
  forbidden,
  conflict,
  badRequest,
  unprocessable,
  genericError,
  notFound,
  catchall,
};

const all = Object.keys(exportables).map((key) => exportables[key]);

module.exports = {
  ...exportables,
  all,
};
