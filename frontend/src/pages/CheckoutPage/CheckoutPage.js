import {
  Box,
  Button,
  Container,
  Paper,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { AddressForm } from "../../components/AddressForm/AddressForm";
import { PaymentForm } from "../../components/PaymentForm/PaymentForm";
import { Review } from "../../components/Review/Review";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectProductsByArray } from "../../features/product/productSlice";
import validator from "validator";
import { checkoutCart } from "../../features/cart/cartSliceThunks";

export const CheckoutPage = ({ user, cart }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [addressFormDetails, setAddressFormDetails] = useState({
    firstName: user.firstName || "",
    firstNameError: false,
    lastName: user.lastName || "",
    lastNameError: false,
    addressOne: "",
    addressOneError: false,
    addressTwo: "",
    addressTwoError: false,
    city: "",
    cityError: false,
    state: "",
    stateError: false,
    zip: "",
    zipError: false,
    country: "",
    countryError: false,
  });
  const [paymentFormDetails, setPaymentFormDetails] = useState({
    cardName: "",
    cardNameError: false,
    cardNumber: "",
    cardNumberError: false,
    expDate: null,
    expDateError: false,
    cvv: "",
    cvvError: false,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const productInfo = useSelector((state) =>
    selectProductsByArray(state, cart.products)
  );

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

  useEffect(() => {
    if (!cart.products.length) {
      navigate("/");
    }
  }, [cart, navigate]);

  useEffect(() => {
    addressFormDetails.firstName &&
    !validator.isAlpha(addressFormDetails.firstName, "de-DE")
      ? setAddressFormDetails((prev) => ({ ...prev, firstNameError: true }))
      : setAddressFormDetails((prev) => ({ ...prev, firstNameError: false }));

    addressFormDetails.lastName &&
    !validator.isAlpha(addressFormDetails.lastName, "de-DE")
      ? setAddressFormDetails((prev) => ({ ...prev, lastNameError: true }))
      : setAddressFormDetails((prev) => ({ ...prev, lastNameError: false }));

    addressFormDetails.addressOne &&
    !validator.isAlphanumeric(addressFormDetails.addressOne, "de-DE")
      ? setAddressFormDetails((prev) => ({ ...prev, addressOneError: true }))
      : setAddressFormDetails((prev) => ({ ...prev, addressOneError: false }));

    addressFormDetails.addressTwo &&
    !validator.isAlphanumeric(addressFormDetails.addressTwo, "de-DE")
      ? setAddressFormDetails((prev) => ({ ...prev, addressTwoError: true }))
      : setAddressFormDetails((prev) => ({ ...prev, addressTwoError: false }));

    addressFormDetails.city &&
    !validator.isAlpha(addressFormDetails.city, "de-DE")
      ? setAddressFormDetails((prev) => ({ ...prev, cityError: true }))
      : setAddressFormDetails((prev) => ({ ...prev, cityError: false }));

    addressFormDetails.state &&
    !validator.isAlpha(addressFormDetails.state, "de-DE")
      ? setAddressFormDetails((prev) => ({ ...prev, stateError: true }))
      : setAddressFormDetails((prev) => ({ ...prev, stateError: false }));

    addressFormDetails.zip &&
    !validator.isAlphanumeric(addressFormDetails.zip, "de-DE")
      ? setAddressFormDetails((prev) => ({ ...prev, zipError: true }))
      : setAddressFormDetails((prev) => ({ ...prev, zipError: false }));

    addressFormDetails.country &&
    !validator.isAlpha(addressFormDetails.country, "de-DE")
      ? setAddressFormDetails((prev) => ({ ...prev, countryError: true }))
      : setAddressFormDetails((prev) => ({ ...prev, countryError: false }));
  }, [
    addressFormDetails.country,
    addressFormDetails.zip,
    addressFormDetails.state,
    addressFormDetails.city,
    addressFormDetails.addressOne,
    addressFormDetails.addressTwo,
    addressFormDetails.lastName,
    addressFormDetails.firstName,
  ]);

  useEffect(() => {
    paymentFormDetails.cardName &&
    !validator.isAlpha(paymentFormDetails.cardName, "de-DE")
      ? setPaymentFormDetails((prev) => ({ ...prev, cardNameError: true }))
      : setPaymentFormDetails((prev) => ({ ...prev, cardNameError: false }));

    paymentFormDetails.cardNumber &&
    !validator.isAlphanumeric(paymentFormDetails.cardNumber, "de-DE")
      ? setPaymentFormDetails((prev) => ({ ...prev, cardNumberError: true }))
      : setPaymentFormDetails((prev) => ({ ...prev, cardNumberError: false }));

    paymentFormDetails.expDate &&
    !validator.isDate(paymentFormDetails.expDate.$d, "de-DE")
      ? setPaymentFormDetails((prev) => ({ ...prev, expDateError: true }))
      : setPaymentFormDetails((prev) => ({ ...prev, expDateError: false }));

    paymentFormDetails.cvv &&
    !validator.isAlpha(paymentFormDetails.cvv, "de-DE")
      ? setPaymentFormDetails((prev) => ({ ...prev, cvvError: true }))
      : setPaymentFormDetails((prev) => ({ ...prev, cvvError: false }));
  }, [
    paymentFormDetails.cardName,
    paymentFormDetails.cardNumber,
    paymentFormDetails.expDate,
    paymentFormDetails.cvv,
  ]);

  const addressFormDisabled =
    !addressFormDetails.firstName ||
    !addressFormDetails.lastName ||
    !addressFormDetails.addressOne ||
    !addressFormDetails.city ||
    !addressFormDetails.zip ||
    !addressFormDetails.country ||
    addressFormDetails.firstNameError ||
    addressFormDetails.lastNameError ||
    addressFormDetails.addressOneError ||
    addressFormDetails.addressTwoError ||
    addressFormDetails.cityError ||
    addressFormDetails.stateError ||
    addressFormDetails.zipError ||
    addressFormDetails.countryError;

  const paymentFormDisabled =
    !paymentFormDetails.cardName ||
    !paymentFormDetails.cardNumber ||
    !paymentFormDetails.expDate ||
    !paymentFormDetails.cvv ||
    paymentFormDetails.cardNameError ||
    paymentFormDetails.cardNumberError ||
    paymentFormDetails.expDateError ||
    paymentFormDetails.cvvError;

  const steps = ["Lieferadresse", "Zahlungsinfos", "Übersicht"];

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <AddressForm
            user={user}
            addressFormDetails={addressFormDetails}
            setAddressFormDetails={setAddressFormDetails}
          />
        );
      case 1:
        return (
          <PaymentForm
            paymentFormDetails={paymentFormDetails}
            setPaymentFormDetails={setPaymentFormDetails}
          />
        );
      case 2:
        return (
          <Review
            cartItems={cartItems}
            paymentFormDetails={paymentFormDetails}
            addressFormDetails={addressFormDetails}
          />
        );
      default:
        throw new Error("Unknown step");
    }
  }

  const handleNext = () => {
    if (activeStep !== 2) {
      setActiveStep(activeStep + 1);
    } else {
      dispatch(checkoutCart())
        .unwrap()
        .then((result) => {
          if (result.ok) {
            setActiveStep(activeStep + 1);
          } else {
            throw new Error("error while placing order");
          }
        });
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <Paper
        variant="outlined"
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
      >
        <Typography component="h1" variant="h4" align="center">
          Checkout
        </Typography>
        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography variant="h5" gutterBottom>
              Thank you for your order.
            </Typography>
            <Typography variant="subtitle1">
              Your order number is #2001539. We have emailed your order
              confirmation, and will send you an update when your order has
              shipped.
            </Typography>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {getStepContent(activeStep)}
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              {activeStep !== 0 && (
                <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                  Back
                </Button>
              )}

              <Button
                disabled={
                  activeStep === 0
                    ? addressFormDisabled
                    : activeStep === 1
                    ? paymentFormDisabled
                    : false
                }
                variant="contained"
                onClick={handleNext}
                sx={{ mt: 3, ml: 1 }}
              >
                {activeStep === steps.length - 1 ? "Place order" : "Next"}
              </Button>
            </Box>
          </React.Fragment>
        )}
      </Paper>
    </Container>
  );
};
