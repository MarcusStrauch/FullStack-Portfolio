import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";
import "./LandingPage.css";
import { AnimatedPage } from "../../components/AnimatedPage/AnimatedPage";
import landingBg from "../../assets/landing_bg.webp";
import { Link as RouterLink } from "react-router-dom";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import haLogo from "../../assets/haLogo.webp";

const landingPageScrollContainerStyles = {
  scrollSnapAlign: "start",
  height: "calc(100vh - 140px)",
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
              fontSize: "1.75rem",
              letterSpacing: ".3rem",
              color: "#fff",
              textDecoration: "none",
              position: "relative",
              textTransform: "uppercase",
              textAlign: "left",
            }}
          >
            DAS HOLZARSENAL
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
            Praktisches und Interessantes rund ums Holz
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/produkte"
            sx={{
              ml: 6,
              mt: 8,
              fontSize: "1.5rem",
            }}
          >
            <ArrowRightIcon fontSize="large" />
            Alle Produkte
          </Button>
        </Container>
        <Container
          component={Paper}
          elevation={18}
          sx={{
            ...landingPageScrollContainerStyles,
            borderBottom: "4px solid",
            padding: "10px",
          }}
        >
          <img src={haLogo} alt="Holzarsenal logo" className="haLogoLanding" />
          <Typography
            sx={{ textAlign: "center", fontSize: "1.15rem", padding: "0 10px" }}
          >
            Leim?
            <br /> Kleber?
            <br /> Ein Pflegeöl für den Küchentisch?
            <br /> Ein schöner handgefertigter Hocker?
            <br /> Eine einzigartige und praktische Lampe?
            <br />
            Ein kleiner Rahmen oder etwas zum Basteln als Geschenk für Ihre
            Liebsten?
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
            <ChevronRightIcon /> Das gibt es hier beim Holzarsenal{" "}
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
                borderBottom:
                  index === productCategories.length - 1 ? "" : "4px solid",
              }}
            >
              <img
                alt="xd"
                key={category.productCategoryId}
                src={category.images.main}
                className="landingPageBg"
              />
              <Box
                component={Paper}
                elevation={4}
                sx={{
                  position: "relative",
                  margin: "20px",
                  padding: "10px",
                  background: "#00000075",
                  height: "calc(100vh - 180px)",
                }}
              >
                <Typography
                  variant="h2"
                  sx={{
                    color: "#fff",
                    fontSize: "2rem",
                    fontWeight: "700",
                    mb: "10px",
                    textDecoration: "underline",
                  }}
                >
                  {category.title}
                </Typography>
                <Typography sx={{ color: "#fff", fontSize: "1.2rem" }}>
                  {category.description}
                </Typography>
                <Button
                  variant="contained"
                  component={RouterLink}
                  to={`/produkte/${category.name}`}
                  sx={{
                    fontSize: "1.5rem",
                    position: "absolute",
                    bottom: "60px",
                    left: "50%",
                    transform: "translateX(-50%)",
                  }}
                >
                  <ArrowRightIcon fontSize="large" />
                  {category.title}
                </Button>
              </Box>
            </Container>
          ))}
      </Grid>
    </AnimatedPage>
  );
};
