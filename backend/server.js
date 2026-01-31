/* eslint-disable no-console */
const cookieParser = require("cookie-parser");
const express = require("express");
const path = require("path");
const session = require("express-session");
const bodyParser = require("body-parser");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const yaml = require("js-yaml");
const fs = require("fs");
const morgan = require("morgan");
const KnexSessionStore = require("connect-session-knex")(session);
const passport = require("./config/passport");
const knex = require("./db/index");

const app = express();

app.set("trust proxy", 1);
require("dotenv").config();

const store = new KnexSessionStore({
  knex,
  tablename: "sessions",
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SESSION_SECRET));

app.use(
  cors({
    origin: process.env.CORS_ORIGINS,
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 1.5 * 24 * 60 * 60 * 1000,
      sameSite: process.env.SAME_SITE,
    },
    store,
  })
);

app.use(passport.initialize());
app.use(passport.session());

const swaggerDocument = yaml.load(
  fs.readFileSync(path.resolve(__dirname, "../backend/swagger.yml"), "utf8")
);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms - :req[Cookie]"
  )
);

const authRouter = require("./routes/auth_routes");
const cartRouter = require("./routes/cart_routes");
const ordersRouter = require("./routes/order_routes");
const productsRouter = require("./routes/product_routes");
const userRouter = require("./routes/user_routes");

app.use("/auth", authRouter);
app.use("/cart", cartRouter);
app.use("/order", ordersRouter);
app.use("/product", productsRouter);
app.use("/user", userRouter);

app.use(require("./error_handling/error_middleware").all);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
