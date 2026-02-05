import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { searchProductsByTitle } from "../../features/product/productSlice";
import {
  Box,
  Container,
  Divider,
  Grid,
  Link,
  Paper,
  Typography,
} from "@mui/material";
import { centToEur } from "../../utils/utils";
import { Link as RouterLink } from "react-router-dom";

export const SearchPage = ({ productCategories }) => {
  const [searchParams] = useSearchParams();

  const searchTerm = searchParams.get("q") || "";

  const searchResults = useSelector((state) =>
    searchProductsByTitle(state, searchTerm)
  );

  return searchResults.length ? (
    <Container component="main" maxWidth="lg" sx={{ mt: 2 }}>
      {productCategories &&
        productCategories.map((category) => {
          const filteredResults = searchResults.filter(
            (result) => result.productCategoryId === category.productCategoryId
          );
          if (filteredResults.length) {
            return (
              <Box key={category.productCategoryId}>
                <Typography variant="h3" component="h2">
                  {category.title}
                </Typography>
                <Divider sx={{ mt: 1, mb: 2 }} />
                <Grid container spacing={2}>
                  {filteredResults.map((product, index) => {
                    return (
                      <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                        <Link
                          component={RouterLink}
                          to={`/products/${category?.name}/${product?.productId}`}
                          sx={{
                            textDecoration: "none",
                            height: "100%",
                            width: "100%",
                            display: "flex",
                          }}
                        >
                          <Paper elevation={4} sx={{ overflow: "hidden" }}>
                            <Grid container spacing={2}>
                              <Grid item xs={6} sm={12}>
                                <img
                                  src={product?.images?.main}
                                  alt={product?.name}
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                  }}
                                />
                              </Grid>
                              <Grid item xs={6} sm={12}>
                                <Box
                                  sx={{
                                    mr: 2,
                                    mt: { xs: 2, sm: 0 },
                                    ml: { xs: 0, sm: 2 },
                                    minHeight: "105px",
                                  }}
                                >
                                  <Typography
                                    sx={{
                                      mb: 1,
                                    }}
                                  >
                                    {product?.name}
                                  </Typography>
                                  <Divider />
                                  <Typography sx={{ mt: 1 }}>
                                    {centToEur(product?.unitPrice)}
                                  </Typography>
                                </Box>
                              </Grid>
                            </Grid>
                          </Paper>
                        </Link>
                      </Grid>
                    );
                  })}
                </Grid>
              </Box>
            );
          }
          return null;
        })}
    </Container>
  ) : (
    <Container component="main" maxWidth="lg">
      <Paper sx={{ p: 2, mt: 2 }}>
        <Typography>
          Für die Suche nach "{searchTerm}" wurden keine Treffer gefunden.
        </Typography>
      </Paper>
    </Container>
  );
};
