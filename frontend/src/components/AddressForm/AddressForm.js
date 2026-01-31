import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

export const AddressForm = ({
  user,
  addressFormDetails,
  setAddressFormDetails,
}) => {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            value={addressFormDetails.firstName}
            onChange={({ target }) =>
              setAddressFormDetails((prev) => ({
                ...prev,
                firstName: target.value,
              }))
            }
            error={addressFormDetails.firstNameError}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            value={addressFormDetails.lastName}
            onChange={({ target }) =>
              setAddressFormDetails((prev) => ({
                ...prev,
                lastName: target.value,
              }))
            }
            error={addressFormDetails.lastNameError}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Address line 1"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
            value={addressFormDetails.addressOne}
            onChange={({ target }) =>
              setAddressFormDetails((prev) => ({
                ...prev,
                addressOne: target.value,
              }))
            }
            error={addressFormDetails.addressOneError}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label="Address line 2"
            fullWidth
            autoComplete="shipping address-line2"
            variant="standard"
            value={addressFormDetails.addressTwo}
            onChange={({ target }) =>
              setAddressFormDetails((prev) => ({
                ...prev,
                addressTwo: target.value,
              }))
            }
            error={addressFormDetails.addressTwoError}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
            value={addressFormDetails.city}
            onChange={({ target }) =>
              setAddressFormDetails((prev) => ({ ...prev, city: target.value }))
            }
            error={addressFormDetails.cityError}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="state"
            label="State/Province/Region"
            fullWidth
            variant="standard"
            value={addressFormDetails.state}
            onChange={({ target }) =>
              setAddressFormDetails((prev) => ({
                ...prev,
                state: target.value,
              }))
            }
            error={addressFormDetails.stateError}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="shipping postal-code"
            variant="standard"
            value={addressFormDetails.zip}
            onChange={({ target }) =>
              setAddressFormDetails((prev) => ({ ...prev, zip: target.value }))
            }
            error={addressFormDetails.zipError}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="shipping country"
            variant="standard"
            value={addressFormDetails.country}
            onChange={({ target }) =>
              setAddressFormDetails((prev) => ({
                ...prev,
                country: target.value,
              }))
            }
            error={addressFormDetails.countryError}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox color="secondary" name="saveAddress" value="yes" />
            }
            label="Use this address for payment details"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
