import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { DatePicker } from "@mui/x-date-pickers";

export const PaymentForm = ({ paymentFormDetails, setPaymentFormDetails }) => {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardName"
            label="Name on card"
            fullWidth
            autoComplete="cc-name"
            variant="standard"
            value={paymentFormDetails.cardName}
            onChange={({ target }) =>
              setPaymentFormDetails((prev) => ({
                ...prev,
                cardName: target.value,
              }))
            }
            error={paymentFormDetails.cardNameError}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardNumber"
            label="Card number"
            fullWidth
            autoComplete="cc-number"
            variant="standard"
            value={paymentFormDetails.cardNumber}
            onChange={({ target }) =>
              setPaymentFormDetails((prev) => ({
                ...prev,
                cardNumber: target.value,
              }))
            }
            error={paymentFormDetails.cardNumberError}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{ alignItems: "center", display: "flex" }}
        >
          <DatePicker
            required
            disablePast
            id="expDate"
            label="Expiry date"
            fullWidth
            autoComplete="cc-exp"
            variant="standard"
            value={paymentFormDetails.expDate}
            onChange={(newValue) =>
              setPaymentFormDetails((prev) => ({
                ...prev,
                expDate: newValue,
              }))
            }
            error={paymentFormDetails.expDateError}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cvv"
            label="CVV"
            helperText="Last three digits on signature strip"
            fullWidth
            autoComplete="cc-csc"
            variant="standard"
            value={paymentFormDetails.cvv}
            onChange={({ target }) =>
              setPaymentFormDetails((prev) => ({ ...prev, cvv: target.value }))
            }
            error={paymentFormDetails.cvvError}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveCard" value="yes" />}
            label="Remember credit card details for next time"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
