import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import { centToEur } from "../../utils/utils";

export const Review = ({
  cartItems,
  paymentFormDetails,
  addressFormDetails,
  handleSubmitOrder,
}) => {
  const addressDetails = { ...addressFormDetails };
  delete addressDetails.firstName;
  delete addressDetails.lastName;
  const addresses = Object.values(addressDetails).filter((item) => !!item);

  const payments = [
    { name: "Card type", detail: "Visa" },
    { name: "Card holder", detail: paymentFormDetails.cardName },
    { name: "Card number", detail: paymentFormDetails.cardNumber },
    {
      name: "Expiry date",
      detail: paymentFormDetails.expDate.$d.toLocaleDateString("de-DE"),
    },
  ];

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Zusammenfassung
      </Typography>
      <List disablePadding>
        {cartItems.map((product) => (
          <ListItem
            key={product.name}
            sx={{ py: 1, px: 0, display: "flex", alignItems: "baseline" }}
          >
            <ListItemText
              primary={product.name}
              secondary={`Menge: ${product.quantity}`}
              sx={{ pr: 4 }}
            />
            <Typography variant="body2">{centToEur(product.total)}</Typography>
          </ListItem>
        ))}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Gesamt" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {centToEur(
              cartItems.reduce(
                (subTotal, item) =>
                  subTotal + Number(item.unitPrice) * Number(item.quantity),
                0
              )
            )}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Lieferung
          </Typography>
          <Typography gutterBottom>
            {addressFormDetails.firstName + " " + addressFormDetails.lastName}
          </Typography>
          <Typography gutterBottom>{addresses.join(", ")}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Bezahlungsdetails
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom sx={{ textAlign: "end" }}>
                    {payment.detail}
                  </Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
