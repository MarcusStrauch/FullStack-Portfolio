import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrders } from "../../features/order/orderSliceThunks";
import { selectOrders } from "../../features/order/orderSlice";
import {
  Box,
  Container,
  Divider,
  Grid,
  Paper,
  Skeleton,
  Typography,
} from "@mui/material";

export const OrdersPage = ({ user }) => {
  const orders = useSelector(selectOrders);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserOrders());
  }, [dispatch]);

  return orders ? (
    <Container>
      {orders.map((order) => (
        <Paper key={order.orderId} sx={{ p: 2, my: 2 }}>
          <Typography variant="h5" component="h2">
            Bestellung vom {new Date(order.created).toLocaleString("de-DE")}
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Grid container spacing={2}>
            {order.products.map((product, index, arr) => (
              <Grid key={index} item md={4}>
                <Box component={Paper} elevation={4} sx={{ p: 2 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={4} md={4}>
                      <img
                        src={product.images.main}
                        alt={product.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          borderRadius: "6px",
                        }}
                      />
                    </Grid>
                    <Grid item xs={8} md={7}>
                      <Typography>{product.name}</Typography>
                      <Typography>Menge: {product.quantity}</Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Paper>
      ))}
    </Container>
  ) : (
    <Container sx={{ mt: 2 }}>
      <Skeleton height={400} variant="rounded" sx={{ mb: 2 }} />
      <Skeleton height={400} variant="rounded" sx={{ mb: 2 }} />
      <Skeleton height={400} variant="rounded" sx={{ mb: 2 }} />
    </Container>
  );
};
