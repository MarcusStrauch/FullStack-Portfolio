import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { useSelector } from "react-redux";
import { selectProductsByCategory } from "../../features/product/productSlice";
import { Link as RouterLink } from "react-router-dom";

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
