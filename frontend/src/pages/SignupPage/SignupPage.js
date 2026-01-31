import { useDispatch, useSelector } from "react-redux";
import { selectLogInStatus } from "../../features/user/userSlice";
import { Navigate } from "react-router-dom";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link as RouterLink } from "react-router-dom";
import { AnimatedPage } from "../../components/AnimatedPage/AnimatedPage";
import { signUp } from "../../features/user/userSliceThunks";
import validator from "validator";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Marcus Strauch
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export const SignupPage = () => {
  const [userName, setUserName] = React.useState({
    value: "",
    error: false,
    errorMessage: "",
  });
  const [email, setEmail] = React.useState({
    value: "",
    error: false,
    errorMessage: "",
  });
  const [password, setPassword] = React.useState({
    value: "",
    error: false,
    errorMessage: "",
  });
  const [firstName, setFirstName] = React.useState({
    value: "",
    error: false,
    errorMessage: "",
  });
  const [lastName, setLastName] = React.useState({
    value: "",
    error: false,
    errorMessage: "",
  });
  const dispatch = useDispatch();

  const logInStatus = useSelector(selectLogInStatus);

  const handleSubmit = (e) => {
    e.preventDefault();
    const submissionObj = {
      userName: userName.value.trim(),
      password: password.value.trim(),
      email: email.value.trim(),
    };
    if (lastName.value && !lastName.error) {
      submissionObj.lastName = lastName.value.trim();
    }
    if (firstName.value && !firstName.error) {
      submissionObj.firstName = firstName.value.trim();
    }
    dispatch(signUp(submissionObj))
      .unwrap()
      .then((result) => {
        if (!result.ok) {
          setEmail((prev) => ({
            ...prev,
            error: true,
            errorMessage: result.message,
          }));
        }
      })
      .catch((err) => {
        if (!err.ok) {
          setEmail((prev) => ({
            ...prev,
            error: true,
            errorMessage: err.message,
          }));
        }
      });
  };

  React.useEffect(() => {
    if (userName.value) {
      let lengthCheck = validator.isLength(userName.value, { min: 3, max: 40 });
      setUserName((prev) => ({
        ...prev,
        error: !lengthCheck,
        errorMessage: lengthCheck
          ? ""
          : "Nutzername sollte mindestens 3 Zeichen enthalten",
      }));
    } else {
      setUserName((prev) => ({ ...prev, error: false, errorMessage: "" }));
    }
  }, [userName.value]);

  React.useEffect(() => {
    if (email.value) {
      let lengthCheck = validator.isLength(email.value, { min: 3, max: 40 });
      setEmail((prev) => ({
        ...prev,
        error: !lengthCheck,
        errorMessage: lengthCheck
          ? ""
          : "E-Mail sollte mindestens 3 Zeichen enthalten",
      }));
    } else {
      setEmail((prev) => ({ ...prev, error: false, errorMessage: "" }));
    }
  }, [email.value]);

  React.useEffect(() => {
    if (lastName.value) {
      let lengthCheck = validator.isLength(lastName.value, { min: 3, max: 40 });
      setLastName((prev) => ({
        ...prev,
        error: !lengthCheck,
        errorMessage: lengthCheck
          ? ""
          : "Nachname sollte mindestens 3 Zeichen enthalten",
      }));
    } else {
      setLastName((prev) => ({ ...prev, error: false, errorMessage: "" }));
    }
  }, [lastName.value]);

  React.useEffect(() => {
    if (firstName.value) {
      let lengthCheck = validator.isLength(firstName.value, {
        min: 3,
        max: 40,
      });
      setFirstName((prev) => ({
        ...prev,
        error: !lengthCheck,
        errorMessage: lengthCheck
          ? ""
          : "Vorname sollte mindestens 3 Zeichen enthalten",
      }));
    } else {
      setFirstName((prev) => ({ ...prev, error: false, errorMessage: "" }));
    }
  }, [firstName.value]);

  React.useEffect(() => {
    if (password.value) {
      let lengthCheck = validator.isLength(password.value, {
        min: 6,
        max: 100,
      });
      setPassword((prev) => ({
        ...prev,
        error: !lengthCheck,
        errorMessage: lengthCheck
          ? ""
          : "Passwort sollte mindestens 6 Zeichen enthalten",
      }));
    } else {
      setPassword((prev) => ({ ...prev, error: false, errorMessage: "" }));
    }
  }, [password.value]);

  return logInStatus.loggedIn ? (
    <Navigate to="/" />
  ) : (
    <AnimatedPage>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  value={firstName.value}
                  onChange={({ target }) =>
                    setFirstName((prev) => ({ ...prev, value: target.value }))
                  }
                  error={firstName.error}
                  helperText={firstName.errorMessage}
                  autoComplete="given-name"
                  name="firstName"
                  fullWidth
                  id="firstName"
                  label="Vorname"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  value={lastName.value}
                  onChange={({ target }) =>
                    setLastName((prev) => ({ ...prev, value: target.value }))
                  }
                  error={lastName.error}
                  helperText={lastName.errorMessage}
                  fullWidth
                  id="lastName"
                  label="Nachname"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={userName.value}
                  onChange={({ target }) =>
                    setUserName((prev) => ({ ...prev, value: target.value }))
                  }
                  error={userName.error}
                  helperText={userName.errorMessage}
                  fullWidth
                  required
                  id="userName"
                  label="Nutzername"
                  name="userName"
                  autoComplete="username"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={email.value}
                  onChange={({ target }) =>
                    setEmail((prev) => ({ ...prev, value: target.value }))
                  }
                  error={email.error}
                  helperText={email.errorMessage}
                  required
                  fullWidth
                  id="email"
                  label="E-Mail Adresse"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={password.value}
                  onChange={({ target }) =>
                    setPassword((prev) => ({ ...prev, value: target.value }))
                  }
                  error={password.error}
                  helperText={password.errorMessage}
                  required
                  fullWidth
                  name="password"
                  label="Passwort"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Link component={RouterLink} to="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 5 }} /> */}
      </Container>
    </AnimatedPage>
  );
};
