import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";
import "./LandingPage.css";
import { AnimatedPage } from "../../components/AnimatedPage/AnimatedPage";
import landingBg from "../../assets/landing_bg.webp";
import { Link as RouterLink } from "react-router-dom";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import woodstack_logo from "../../assets/woodstack_logo.png";

const landingPageScrollContainerStyles = {
  scrollSnapAlign: "start",
  width: "100vw",
  padding: "0",
  margin: "0 auto",
  overflow: "hidden",
  position: "relative",
  borderRadius: 0,
};

export const LandingPage = ({ productCategories, appbarHeight }) => {
  return (
    <AnimatedPage>
      <Grid
        sx={{
          width: "100vw",
          height: `calc(100vh - ${appbarHeight}px)`,
          padding: "0",
          scrollSnapType: "y mandatory",
          scrollMargin: "20px",
          overflow: "scroll",
        }}
      >
        <div style={{ height: `${appbarHeight}px` }} />
        <Container
          component={Paper}
          elevation={18}
          className="landingPageScrollContainer"
          sx={{
            ...landingPageScrollContainerStyles,
            height: "calc(100vh - 140px)",
            borderBottom: "4px solid",
          }}
        >
          <img alt="xd" src={landingBg} className="landingPageStartBg" />
          <Typography
            variant="h1"
            noWrap
            sx={{
              ml: 2,
              mt: 8,
              fontFamily: "monospace",
              fontWeight: 700,
              fontSize: "3rem",
              letterSpacing: ".3rem",
              color: "#fff",
              textDecoration: "none",
              position: "relative",
              textTransform: "uppercase",
              textAlign: "left",
            }}
          >
            Woodstack
          </Typography>
          <Typography
            sx={{
              ml: 2,
              mt: 8,
              fontFamily: "monospace",
              fontWeight: 700,
              fontSize: "1.5rem",
              color: "#fff",
              textDecoration: "none",
              position: "relative",
              textAlign: "left",
            }}
          >
            Delightful, handcrafted wood products
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/products"
            sx={{
              ml: 6,
              mt: 8,
              fontSize: "1.5rem",
            }}
          >
            <ArrowRightIcon fontSize="large" />
            See our catalog!
          </Button>
        </Container>
        <Container
          component={Paper}
          elevation={18}
          sx={{
            ...landingPageScrollContainerStyles,
            borderBottom: "4px solid",
            padding: "10px",
            height: "calc(100vh - 140px)",
          }}
        >
          <img
            src={woodstack_logo}
            alt="Holzarsenal logo"
            className="woodstackLogoLanding"
          />
          <Typography
            sx={{ textAlign: "center", fontSize: "1.15rem", padding: "0 10px" }}
          >
            Glue?
            <br />
            Adhesive?
            <br />A nourishing oil for your kitchen table?
            <br />A beautifully handcrafted stool?
            <br />A unique and practical lamp?
            <br />
            Or perhaps a small frame or a creative DIY gift for someone you
            love?
          </Typography>
          <Typography
            sx={{
              alignContent: "center",
              justifyContent: "center",
              display: "flex",
              mt: 7,
              fontWeight: 900,
              fontSize: "1.2rem",
            }}
          >
            <ChevronRightIcon /> Get it in our Woodstack store!{" "}
            <ChevronLeftIcon />
          </Typography>
        </Container>
        {productCategories &&
          productCategories.map((category, index) => (
            <Container
              key={index}
              component={Paper}
              elevation={18}
              sx={{
                ...landingPageScrollContainerStyles,
                height: "35vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderBottom:
                  index === productCategories.length - 1 ? "" : "4px solid",
              }}
            >
              <img
                alt={category.name}
                key={category.productCategoryId}
                src={category.images.main}
                className="landingPageBg"
              />
              <Box
                component={Paper}
                elevation={4}
                sx={{
                  margin: "20px",
                  padding: "25px",
                  width: "100%",
                  background: "#00000075",
                  height: "20vh",
                }}
              >
                <Button
                  variant="contained"
                  component={RouterLink}
                  to={`/products/${category.name}`}
                  sx={{
                    fontSize: "1.5rem",
                    mb: 1,
                  }}
                >
                  <ArrowRightIcon fontSize="large" />
                  {category.title}
                </Button>
                <Typography sx={{ color: "#fff", fontSize: "1.2rem" }}>
                  {category.description}
                </Typography>
              </Box>
            </Container>
          ))}
      </Grid>
    </AnimatedPage>
  );
};
