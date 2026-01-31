import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAuthStatus,
  selectLogInStatus,
  selectUser,
} from "./features/user/userSlice";
import { PrivateRoutes } from "./components/PrivateRoutes/PrivateRoutes";
import { Navigation } from "./components/Navigation/Navigation";
import { LandingPage } from "./pages/LandingPage/LandingPage";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { SignupPage } from "./pages/SignupPage/SignupPage";
import { ProfilePage } from "./pages/ProfilePage/ProfilePage";
import { OrdersPage } from "./pages/OrdersPage/OrdersPage";
import { ProductsPage } from "./pages/ProductsPage/ProductsPage";
import { CategoryPage } from "./pages/CategoryPage/CategoryPage";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline, createTheme } from "@mui/material";
import { ProductPage } from "./pages/ProductPage/ProductPage";
import { loadProducts } from "./features/product/productSliceThunks";
import { selectProductCategories } from "./features/product/productSlice";
import { useAppbarHeight } from "./utils/utils";
import { AnimatePresence } from "framer-motion";
import { authorizeSession } from "./features/user/userSliceThunks";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { CartPage } from "./pages/CartPage/CartPage";
import { selectCart } from "./features/cart/cartSlice";
import { mergeUserCart } from "./features/cart/cartSliceThunks";
import { SearchPage } from "./pages/SearchPage/SearchPage";
import { CheckoutPage } from "./pages/CheckoutPage/CheckoutPage";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function App() {
  const [drawerState, setDrawerState] = React.useState(false);

  const logInStatus = useSelector(selectLogInStatus);
  const authStatus = useSelector(selectAuthStatus);
  const user = useSelector(selectUser);
  const cart = useSelector(selectCart);
  const productCategories = useSelector(selectProductCategories);

  const appbarHeight = useAppbarHeight();

  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(loadProducts());
    dispatch(authorizeSession());
  }, [dispatch]);

  useEffect(() => {
    if (logInStatus.loggedIn) {
      dispatch(mergeUserCart());
    }
  }, [dispatch, logInStatus]);

  useEffect(() => {
    setDrawerState(false);
  }, [location]);

  const theme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#634a3f",
      },
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 475,
        md: 900,
        lg: 1200,
        xl: 1900,
      },
    },
  });

  return (
    <div
      className="App"
      style={
        location.pathname === "/"
          ? { overflow: "hidden", maxWidth: "100vw" }
          : {}
      }
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Navigation
            productCategories={productCategories}
            appbarHeight={appbarHeight}
            logInStatus={logInStatus}
            authStatus={authStatus}
            user={user}
            cart={cart}
            location={location}
            drawerState={drawerState}
            setDrawerState={setDrawerState}
          />
          <AnimatePresence mode="wait">
            <Routes key={location.pathname} location={location}>
              <Route
                index
                element={
                  <LandingPage
                    appbarHeight={appbarHeight}
                    productCategories={productCategories}
                  />
                }
              />
              <Route path="login" element={<LoginPage />} />
              <Route path="signup" element={<SignupPage />} />
              <Route
                path="suche"
                element={<SearchPage productCategories={productCategories} />}
              />
              <Route
                path="warenkorb"
                element={
                  <CartPage
                    mergeCartStatus={{ pending: false }}
                    logInStatus={logInStatus}
                    cart={cart}
                  />
                }
              />
              <Route
                element={<PrivateRoutes loggedIn={logInStatus.loggedIn} />}
              >
                <Route path="me">
                  <Route index element={<ProfilePage user={user} />} />
                  <Route
                    path="bestellungen"
                    element={<OrdersPage user={user} />}
                  />
                </Route>
                <Route
                  path="checkout"
                  element={<CheckoutPage user={user} cart={cart} />}
                />
              </Route>
              <Route path="produkte">
                <Route index element={<ProductsPage />} />
                <Route path=":category" element={<CategoryPage />} />
                <Route
                  path=":category/:productId"
                  element={<ProductPage logInStatus={logInStatus} />}
                />
              </Route>
            </Routes>
          </AnimatePresence>
        </ThemeProvider>
      </LocalizationProvider>
    </div>
  );
}

export default App;
