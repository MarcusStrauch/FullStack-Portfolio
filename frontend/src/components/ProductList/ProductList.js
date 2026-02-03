import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { useSelector } from "react-redux";
import { selectProductsByCategory } from "../../features/product/productSlice";

export const ProductList = ({ productCategoryId }) => {
  const categoryProducts = useSelector((state) =>
    selectProductsByCategory(state, productCategoryId),
  );

  return (
    <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
      {categoryProducts.map((product) => (
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
      ))}
    </ImageList>
  );
};
