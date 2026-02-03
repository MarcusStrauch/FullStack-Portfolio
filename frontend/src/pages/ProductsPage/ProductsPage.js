import { Container, Paper } from "@mui/material";
import { useSelector } from "react-redux";
import { selectProductCategories } from "../../features/product/productSlice";
import { ProductList } from "../../components/ProductList/ProductList";
import { Divider } from "@mui/material";
import { Typography } from "@mui/material";

export const ProductsPage = () => {
  const categories = useSelector(selectProductCategories);

  return (
    <Container sx={{ mt: 2 }}>
      <Paper sx={{ width: "fit-content" }} elevation={4}>
        {categories.map((category) => {
          return (
            <div key={category.productCategoryId} className="productListContainer">
              <Typography variant="h3" component="h2">
                {category.title}
              </Typography>
              <Divider sx={{ mt: 1, mb: 2 }} />
              <ProductList productCategoryId={category.productCategoryId} />
            </div>
          );
        })}
      </Paper>
    </Container>
  );
};
