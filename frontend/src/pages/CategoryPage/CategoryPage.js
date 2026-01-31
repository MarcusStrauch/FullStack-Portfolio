import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import {
  selectCategoryData,
  selectProductsByCategory,
} from "../../features/product/productSlice";
import {
  Box,
  Container,
  Divider,
  Grid,
  Link,
  Paper,
  Skeleton,
  Typography,
} from "@mui/material";
import { centToEur } from "../../utils/utils";
import { Link as RouterLink } from "react-router-dom";

export const CategoryPage = () => {
  const { category } = useParams();
  const theme = useTheme();

  const categoryData = useSelector((state) =>
    selectCategoryData(state, category)
  );

  const categoryProducts = useSelector((state) =>
    selectProductsByCategory(state, categoryData?.productCategoryId)
  );

  return categoryData && categoryProducts ? (
    <Container maxWidth="lg" sx={{ p: 2 }}>
      <Typography
        variant="h1"
        sx={{
          fontSize: "3rem",
          pb: "10px",
          borderBottom: `1px solid ${theme.palette.primary.light}`,
          mb: 2,
        }}
      >
        {categoryData?.title}
      </Typography>
      <Grid container spacing={2}>
        {categoryProducts &&
          categoryProducts.map((product, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Link
                component={RouterLink}
                to={`/produkte/${categoryData?.name}/${product?.productId}`}
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
                        alt="xf"
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
          ))}
      </Grid>
    </Container>
  ) : (
    <Container maxWidth="lg" sx={{ p: 2 }}>
      <Skeleton animation="wave" variant="rounded" height={100} sx={{mb: "20px"}} ></Skeleton>
      <Divider />
      <Grid container spacing={2} sx={{mt: "8px"}}>
        {Array.from(Array(12).keys()).map((item, index) => (
          <Grid height={350} item xs={12} sm={6} md={4} lg={3} key={index}>
           <Skeleton animation="wave" variant="rounded" height="100%"  />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
