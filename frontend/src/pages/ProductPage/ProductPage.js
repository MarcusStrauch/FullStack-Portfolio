import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  selectCategoryData,
  selectOneProduct,
} from "../../features/product/productSlice";
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Divider,
  FormControl,
  Grid,
  MenuItem,
  Paper,
  Select,
  Skeleton,
  Typography,
} from "@mui/material";
import { centToEur } from "../../utils/utils";
import { addItemToCart } from "../../features/cart/cartSlice";
import { useState } from "react";
import validator from "validator";
import { mergeUserCart } from "../../features/cart/cartSliceThunks";

export const ProductPage = ({ logInStatus }) => {
  const [quantity, setQuantity] = useState(1);

  const { category, productId } = useParams();

  const dispatch = useDispatch();

  const categoryData = useSelector((state) =>
    selectCategoryData(state, category)
  );

  const productData = useSelector((state) =>
    selectOneProduct(state, productId)
  );

  const handleCartButtonPress = () => {
    const submissionObj = {
      quantity: validator.isEmpty(String(quantity)) ? 1 : quantity,
      productId,
      productCategoryId: categoryData?.productCategoryId,
    };
    dispatch(addItemToCart(submissionObj));
    if (logInStatus.loggedIn) {
      dispatch(mergeUserCart());
    }
  };

  const handleQuantityChange = ({ target }) => {
    const newValue = String(target.value);
    if (
      (validator.isInt(newValue) && Number(newValue) > 0) ||
      validator.isEmpty(newValue)
    ) {
      setQuantity(target.value);
    }
  };

  return productData ? (
    <Container sx={{ mt: 2 }}>
      <Paper sx={{ width: "fit-content" }} elevation={4}>
        <Box sx={{ p: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={5} sx={{ maxHeight: { sm: "50vw" } }}>
              <img
                src={productData.images.main}
                alt={productData.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "6px",
                }}
              />
            </Grid>
            <Grid item xs={12} sm={7}>
              <Typography variant="h7" component="h1">
                {productData.name}
              </Typography>
              <Divider />
              <Typography sx={{ m: "20px 0", fontSize: "1.5rem" }}>
                {centToEur(productData.unitPrice)}
              </Typography>
              <Typography>{productData.description}</Typography>
              <Box sx={{ m: "20px 20px 10px 20px", display: "flex" }}>
                <ButtonGroup
                  variant="contained"
                  aria-label="outlined primary button group"
                  sx={{height: "45px"}}
                >
                  <FormControl>
                    <Select
                      onChange={handleQuantityChange}
                      value={quantity}
                      sx={{
                        height: "45px",
                        borderBottomRightRadius: 0,
                        borderTopRightRadius: 0,
                      }}
                    >
                      {Array.from(Array(98).keys(), (x) => x + 1).map(
                        (item, index) => (
                          <MenuItem key={item} value={item}>
                            {item}
                          </MenuItem>
                        )
                      )}
                    </Select>
                  </FormControl>
                  <Button
                    sx={{ borderRadius: 0 }}
                    onClick={() => setQuantity((prev) => Number(prev) + 1)}
                  >
                    +
                  </Button>
                  <Button
                    onClick={() =>
                      setQuantity((prev) =>
                        Number(prev) > 1 ? Number(prev) - 1 : Number(prev)
                      )
                    }
                  >
                    -
                  </Button>
                </ButtonGroup>
              </Box>

              <Button
                onClick={handleCartButtonPress}
                variant="contained"
                sx={{
                  m: { xs: "40px auto", sm: "40px 20px" },
                  display: "flex",
                  width: { xs: "90%", sm: "auto" },
                }}
              >
                In den Warenkorb
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  ) : (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Skeleton animation="wave" variant="rectangular" height="60vh" />
      </Grid>
      <Grid item xs={12}>
        <Skeleton
          animation="wave"
          height={20}
          width="90%"
          sx={{ m: "0 0 6px 10px" }}
        />
        {Array.from(Array(8).keys()).map((item, index) => {
          return (
            <Skeleton
              animation="wave"
              height={10}
              width="80%"
              sx={{ ml: "10px", mb: "2px" }}
              key={index}
            />
          );
        })}
        <Skeleton
          animation="wave"
          variant="rectangular"
          height={40}
          width="90%"
          sx={{ m: "40px auto 0", borderRadius: "10px" }}
        />
      </Grid>
    </Grid>
  );
};
