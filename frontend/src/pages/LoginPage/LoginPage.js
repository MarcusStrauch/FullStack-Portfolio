import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import GoogleIcon from '@mui/icons-material/Google';
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import validator from "validator";
import { useDispatch, useSelector } from "react-redux";
import { selectLogInStatus } from "../../features/user/userSlice";
import { Navigate } from "react-router-dom";
import { setSnackbarStatus } from "../../features/application/applicationSlice";
import { Link as RouterLink } from "react-router-dom";
import { AnimatedPage } from "../../components/AnimatedPage/AnimatedPage";
import { logIn } from "../../features/user/userSliceThunks";


export const LoginPage = () => {
  const [userName, setUserName] = React.useState({
    value: "",
    error: false,
    errorMessage: "",
  });
  const [password, setPassword] = React.useState({
    value: "",
    error: false,
    errorMessage: "",
  });
  const dispatch = useDispatch();

  const logInStatus = useSelector(selectLogInStatus);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const submissionObj = {
      username: userName.value.trim(),
      password: password.value.trim(),
    };
    dispatch(logIn(submissionObj))
      .unwrap()
      .then((result) => {
        if (result.ok) {
          dispatch(
            setSnackbarStatus({ message: "Logged in!", type: "success" })
          );
        }
      })
      .catch((err) => {
        dispatch(
          setSnackbarStatus({
            message: "Error while logging in",
            type: "error",
          })
        );
      });
  };

  const handleGoogleLogin = (e) => {
    e.preventDefault();
    window.open(`${process.env.REACT_APP_BACKEND_GOOGLE_ENDPOINT}`, "_self");
  };

  return logInStatus.loggedIn ? (
    <Navigate to="/" />
  ) : (
    <AnimatedPage>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.light" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              value={userName.value}
              onChange={({ target }) =>
                setUserName((prev) => ({ ...prev, value: target.value }))
              }
              error={userName.error}
              helperText={userName.errorMessage}
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
            />
            <TextField
              value={password.value}
              onChange={({ target }) =>
                setPassword((prev) => ({ ...prev, value: target.value }))
              }
              error={password.error}
              helperText={password.errorMessage}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Button sx={{mb: 2}} variant="contained" onClick={handleGoogleLogin} fullWidth >
              <GoogleIcon sx={{mr: 1}} />
              Google Sign In
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Link component={RouterLink} to="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </AnimatedPage>
  );
};
