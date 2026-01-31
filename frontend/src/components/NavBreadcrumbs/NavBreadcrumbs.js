import {
  Breadcrumbs,
  Button,
  Container,
  Paper,
  Typography,
} from "@mui/material";
import { LinkRouter } from "../LinkRouter/LinkRouter";
import { useEffect, useState } from "react";
import { AnimatePresence, motion as m } from "framer-motion";
import HomeIcon from "@mui/icons-material/Home";
import { useSelector } from "react-redux";
import { selectProductIdAndName } from "../../features/product/productSlice";
import { useNavigate } from "react-router-dom";

export const NavBreadcrumbs = ({ location, productCategories }) => {
  const navigate = useNavigate();

  const pathnames = location.pathname.split("/").filter((x) => x);
  const [breadcrumbNameMap, setBreadcrumbNameMap] = useState({
    produkte: "Produkte",
    warenkorb: "Warenkorb",
    me: "Profil",
    login: "Log In",
    signup: "Sign Up",
    suche: "Suche",
    bestellungen: "Bestellungen",
    checkout: "Checkout",
  });

  const productIdsAndNames = useSelector(selectProductIdAndName);

  useEffect(() => {
    const updateObj = {};
    productCategories.forEach((category) => {
      updateObj[`${category.name}`] = category.title;
    });
    productIdsAndNames.forEach((product) => {
      updateObj[`${product.productId}`] = product.name;
    });
    setBreadcrumbNameMap((prev) => ({ ...prev, ...updateObj }));
  }, [productCategories, productIdsAndNames]);

  const handleBackButtonPress = () => {
    navigate(-1);
  };

  return (
    <AnimatePresence>
      {location.pathname !== "/" && (
        <m.div
          initial={{ opacity: 0, transform: "scaleY(0)" }}
          animate={{ opacity: 1, transform: "scaleY(1)" }}
          transition={{ ease: "easeInOut", duration: 0.3 }}
        >
          <Container
            maxWidth="lg"
            sx={{
              mt: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >
            <Paper sx={{ px: 2, py: 1 }}>
              <Breadcrumbs aria-label="breadcrumb">
                <LinkRouter
                  underline="hover"
                  sx={{ display: "flex", alignItems: "center" }}
                  color="inherit"
                  to="/"
                >
                  <HomeIcon sx={{ mr: 0.3 }} fontSize="inherit" />
                  Home
                </LinkRouter>
                {pathnames.map((value, index) => {
                  const last = index === pathnames.length - 1;
                  const to = `/${pathnames.slice(0, index + 1).join("/")}`;

                  return last ? (
                    <Typography color="text.primary" key={to}>
                      {breadcrumbNameMap[value]}
                    </Typography>
                  ) : (
                    <LinkRouter
                      underline="hover"
                      color="inherit"
                      to={to}
                      key={to}
                    >
                      {breadcrumbNameMap[value]}
                    </LinkRouter>
                  );
                })}
              </Breadcrumbs>
            </Paper>
            <Button onClick={handleBackButtonPress} variant="contained">
              Zurück
            </Button>
          </Container>
        </m.div>
      )}
    </AnimatePresence>
  );
};
