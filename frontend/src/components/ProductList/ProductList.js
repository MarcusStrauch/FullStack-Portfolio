import { useSelector } from "react-redux";
import { selectProductsByCategory } from "../../features/product/productSlice";
import { Link as RouterLink } from "react-router-dom";
import { ImageList, ImageListItem, ImageListItemBar, Link } from "@mui/material";

export const ProductList = ({ category }) => {
  const categoryProducts = useSelector((state) =>
    selectProductsByCategory(state, category.productCategoryId),
  );

  return (
    <ImageList sx={{ width: "100%" }} cols={3} rowHeight={300}>
      {categoryProducts.map((product) => (
        <Link
          component={RouterLink}
          to={`/products/${category.name}/${product.productId}`}
          sx={{
            textDecoration: "none",
            height: "100%",
            width: "100%",
            display: "flex",
          }}
        >
          <ImageListItem key={product.productId}>
            <img
              src={`${product.images["main"]}`}
              alt={product.name}
              loading="lazy"
            />
            <ImageListItemBar
              title={product.name}
              subtitle={product.description}
            />
          </ImageListItem>
        </Link>
      ))}
    </ImageList>
  );
};
