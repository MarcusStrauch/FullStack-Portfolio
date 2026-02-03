import {
  Box,
  Button,
  ButtonGroup,
  Container,
  FormControl,
  Grid,
  MenuItem,
  Paper,
  Select,
  Skeleton,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectProductsByArray } from "../../features/product/productSlice";
import { removeCartItem, updateCartItem } from "../../features/cart/cartSlice";
import validator from "validator";
import { useEffect, useState } from "react";
import { centToEur } from "../../utils/utils";
import {
  mergeUserCart,
  removeItemFromUserCart,
} from "../../features/cart/cartSliceThunks";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link as RouterLink } from "react-router-dom";

export const CartPage = ({ logInStatus, cart, mergeCartStatus }) => {
  const productInfo = useSelector((state) =>
    selectProductsByArray(state, cart.products)
  );
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const cartMerged = cart.products.map((item) => {
      const foundCartItem = productInfo.find(
        (product) => Number(product.productId) === Number(item.productId)
      );
      return {
        ...item,
        ...foundCartItem,
        total: item.quantity * Number(foundCartItem.unitPrice),
      };
    });
    setCartItems(cartMerged);
  }, [cart, productInfo]);

  const dispatch = useDispatch();

  const handleQuantityChange = (value, productId) => {
    if (validator.isInt(value) && Number(value) > 0 && Number(value) < 100) {
      dispatch(
        updateCartItem({
          itemToUpdate: productId,
          updatedProps: { quantity: Number(value) },
        })
      );
      if (logInStatus.loggedIn) {
        dispatch(mergeUserCart());
      }
    }
  };

  const handleRemoveItem = (item) => {
    if (logInStatus.loggedIn) {
      dispatch(removeItemFromUserCart(item.cartProductId))
        .unwrap()
        .then((result) => {
          if (result.ok) {
            dispatch(removeCartItem(item.productId));
          }
        });
    } else {
      dispatch(removeCartItem(item.productId));
    }
  };

  return (
    <Container sx={{ px: 3, py: 2 }} maxWidth="lg">
      <Grid container spacing={2}>
        <Grid item md={8}>
          {mergeCartStatus.pending ? (
            <Skeleton variant="rounded"></Skeleton>
          ) : cartItems.length ? (
            cartItems.map((item, index) => {
              return (
                <Grid
                  container
                  component={Paper}
                  key={index}
                  sx={{ mb: 2, p: 2 }}
                >
                  <Grid item sm={4} sx={{ pr: { sm: 2 } }}>
                    <img
                      src={item.images.main}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "6px",
                      }}
                      alt={item.name}
                    />
                  </Grid>
                  <Grid item sm={8}>
                    <Grid container spacing={2}>
                      <Grid item sm={12} md={12} lg={6}>
                        <Box sx={{ pt: { xs: 2, sm: 0 } }}>
                          <Typography variant="h6" component="h2">
                            {item.name}
                          </Typography>
                          <Typography>
                            {centToEur(item.unitPrice)} / ST
                          </Typography>
                          <Button
                            variant="contained"
                            sx={{ mt: 0.8 }}
                            onClick={() => handleRemoveItem(item)}
                          >
                            <DeleteIcon sx={{ mr: 0.4 }} />
                            Entfernen
                          </Button>
                        </Box>
                      </Grid>

                      <Grid item xs={12} sm={12} md={12} lg={6}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <ButtonGroup
                            variant="contained"
                            aria-label="outlined primary button group"
                            sx={{ height: "45px" }}
                          >
                            <FormControl>
                              <Select
                                sx={{
                                  borderBottomRightRadius: 0,
                                  borderTopRightRadius: 0,
                                  height: "45px",
                                }}
                                onChange={(event) => {
                                  handleQuantityChange(
                                    String(event.target.value),
                                    item.productId
                                  );
                                }}
                                value={item.quantity}
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
                              onClick={() => {
                                dispatch(
                                  updateCartItem({
                                    itemToUpdate: item.productId,
                                    updatedProps: {
                                      quantity: item.quantity + 1,
                                    },
                                  })
                                );
                                if (logInStatus.loggedIn) {
                                  dispatch(mergeUserCart());
                                }
                              }}
                            >
                              +
                            </Button>
                            <Button
                              onClick={() => {
                                if (item.quantity > 1) {
                                  dispatch(
                                    updateCartItem({
                                      itemToUpdate: item.productId,
                                      updatedProps: {
                                        quantity: item.quantity - 1,
                                      },
                                    })
                                  );
                                  if (logInStatus.loggedIn) {
                                    dispatch(mergeUserCart());
                                  }
                                }
                              }}
                            >
                              -
                            </Button>
                          </ButtonGroup>
                          <Typography sx={{ textAlign: "right" }}>
                            Summe: {centToEur(item.total)}
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              );
            })
          ) : (
            <Paper sx={{p: 2}}>
              <Typography component="h2" variant="h5">Cart is empty</Typography>
            </Paper>
          )}
        </Grid>
        <Grid item md={4}>
          <Box sx={{ position: "sticky", top: "85px" }}>
            {mergeCartStatus.pending ? (
              <Skeleton variant="rounded"></Skeleton>
            ) : (
              <Paper
                sx={{
                  p: 2,
                  display: "block",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography>Gesamt:</Typography>
                  <Typography>
                    {centToEur(
                      cartItems.reduce(
                        (subTotal, item) =>
                          subTotal +
                          Number(item.unitPrice) * Number(item.quantity),
                        0
                      )
                    )}
                  </Typography>
                </Box>
                <Button
                  component={RouterLink}
                  to={`/checkout`}
                  disabled={!logInStatus.loggedIn || !cart.products.length}
                  variant="contained"
                  sx={{
                    width: "100%",
                    mt: 2,
                    pt: 1.5,
                    pb: 1.5,
                    fontSize: "1.2rem",
                  }}
                >
                  Zur Kasse
                </Button>
                {!logInStatus.loggedIn && (
                  <Button
                    component={RouterLink}
                    to={`/login`}
                    variant="contained"
                    sx={{
                      width: "100%",
                      mt: 2,
                      pt: 1.5,
                      pb: 1.5,
                      fontSize: "1.2rem",
                    }}
                  >
                    Bitte einloggen
                  </Button>
                )}
              </Paper>
            )}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};
