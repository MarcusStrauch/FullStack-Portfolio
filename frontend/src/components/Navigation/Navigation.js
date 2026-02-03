import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import CategoryIcon from "@mui/icons-material/Category";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import {
  Alert,
  Badge,
  ButtonGroup,
  Drawer,
  Link,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Modal,
  Skeleton,
  Snackbar,
  alpha,
  useTheme,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../features/user/userSliceThunks";
import {
  resetSnackbarStatus,
  selectSnackbarStatus,
  setSnackbarStatus,
} from "../../features/application/applicationSlice";
import styled from "@emotion/styled";
import { NavBreadcrumbs } from "../NavBreadcrumbs/NavBreadcrumbs";

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 22,
  height: 22,
  backgroundColor: "#fff",
  border: `2px solid ${theme.palette.background.paper}`,
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  margin: "0 auto",
  width: "fit-content",
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const MobileSearch = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  margin: "0 auto",
  width: "fit-content",
  [theme.breakpoints.up("md")]: {
    display: "none",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export const Navigation = ({
  productCategories,
  appbarHeight,
  logInStatus,
  authStatus,
  user,
  cart,
  location,
  drawerState,
  setDrawerState,
}) => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorElProducts, setAnchorElProducts] = React.useState(null);
  const [expandProducts, setExpandProducts] = React.useState(true);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [openSearch, setOpenSearch] = React.useState(false);
  const snackbarStatus = useSelector(selectSnackbarStatus);

  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const pending = authStatus.pending || logInStatus.pending;

  const handleMenuClick = () => {
    setDrawerState(!drawerState);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenProductMenu = (event) => {
    setAnchorElProducts(event.currentTarget);
  };

  const handleCloseProductMenu = () => {
    setAnchorElProducts(null);
  };

  const handleExpandProducts = () => {
    setExpandProducts(!expandProducts);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(resetSnackbarStatus());
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm) {
      navigate(`/suche/?q=${searchTerm}`);
    }
  };

  return (
    <>
      <AppBar
        id="appBar"
        position="sticky"
        sx={{ zIndex: theme.zIndex.drawer + 1 }}
      >
        <Container maxWidth="xl">
          <Toolbar
            sx={{ display: "flex", justifyContent: "space-between" }}
            disableGutters
          >
            <Link
              sx={{ display: { xs: "none", md: "flex" }, color: "#fff" }}
              component={RouterLink}
              to={"/"}
            >
              <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
              <Typography
                variant="h6"
                noWrap
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                LOGO
              </Typography>
            </Link>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenuClick}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            </Box>

            <Link
              sx={{
                display: { xs: "flex", md: "none" },
                color: "#fff",
              }}
              component={RouterLink}
              to={"/"}
            >
              <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
              <Typography
                variant="h5"
                noWrap
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                LOGO
              </Typography>
            </Link>

            <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
              <Button
                onClick={handleOpenProductMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Products
              </Button>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElProducts}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElProducts)}
                onClose={handleCloseProductMenu}
              >
                {productCategories &&
                  productCategories.map((category) => (
                    <MenuItem
                      key={category.name}
                      onClick={handleCloseProductMenu}
                      component={RouterLink}
                      to={`/products/${category.name}`}
                    >
                      <Typography textAlign="center">
                        {category.title}
                      </Typography>
                    </MenuItem>
                  ))}
              </Menu>
            </Box>
            <Box
              component="form"
              onSubmit={handleSearchSubmit}
              noValidate
              sx={{ flexGrow: 1, display: { sm: "none", md: "block" } }}
            >
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                  onChange={({ target }) => setSearchTerm(target.value)}
                  value={searchTerm}
                />
              </Search>
            </Box>
            {logInStatus.loggedIn ? (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip
                  title="Suche"
                  sx={{ display: { xs: "block", md: "none" } }}
                >
                  <IconButton
                    onClick={() => setOpenSearch(true)}
                    sx={{ p: 0, mr: "8px", display: { xs: "", md: "none" } }}
                  >
                    <Avatar>
                      <SearchIcon />
                    </Avatar>
                  </IconButton>
                </Tooltip>
                <Tooltip title="Warenkorb">
                  <Link component={RouterLink} to="/warenkorb">
                    <IconButton sx={{ p: 0, mr: "8px" }}>
                      {Object.keys(cart.products).length ? (
                        <Badge
                          overlap="circular"
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                          }}
                          badgeContent={
                            <SmallAvatar
                              sx={{ fontSize: "1rem", color: "black" }}
                              alt="Anzahl Waren"
                            >
                              {Object.keys(cart.products).length
                                ? String(Object.keys(cart.products).length)
                                : "0"}
                            </SmallAvatar>
                          }
                        >
                          <Avatar>
                            <ShoppingBasketIcon />
                          </Avatar>
                        </Badge>
                      ) : (
                        <Avatar>
                          <ShoppingBasketIcon />
                        </Avatar>
                      )}
                    </IconButton>
                  </Link>
                </Tooltip>
                <Tooltip title="Account Menü">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt={user.userName}
                      src={user.profileImg}
                      sx={{ bgcolor: theme.palette.primary.light }}
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem
                    component={RouterLink}
                    to="/me"
                    onClick={handleCloseUserMenu}
                  >
                    <Typography textAlign="center">Profil</Typography>
                  </MenuItem>
                  <MenuItem
                    component={RouterLink}
                    to="/me/bestellungen"
                    onClick={handleCloseUserMenu}
                  >
                    <Typography textAlign="center">Bestellungen</Typography>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      dispatch(logOut())
                        .unwrap()
                        .then((result) => {
                          if (result.ok) {
                            dispatch(
                              setSnackbarStatus({
                                message: "Logged out!",
                                type: "success",
                              })
                            );
                          }
                        })
                        .catch((err) => {
                          dispatch(
                            setSnackbarStatus({
                              message: "Error while logging out",
                              type: "error",
                            })
                          );
                        });
                      handleCloseUserMenu();
                    }}
                  >
                    <Typography textAlign="center">Log out</Typography>
                  </MenuItem>
                </Menu>
              </Box>
            ) : pending ? (
              <Skeleton variant="circular" width={40} height={40} />
            ) : (
              <Box>
                <Tooltip title="Warenkorb">
                  <Link component={RouterLink} to="/warenkorb">
                    <IconButton sx={{ p: 0, mr: "10px" }}>
                      {Object.keys(cart.products).length ? (
                        <Badge
                          overlap="circular"
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                          }}
                          badgeContent={
                            <SmallAvatar
                              sx={{ fontSize: "1rem", color: "black" }}
                              alt="Anzahl Waren"
                            >
                              {Object.keys(cart.products).length
                                ? String(Object.keys(cart.products).length)
                                : "0"}
                            </SmallAvatar>
                          }
                        >
                          <Avatar>
                            <ShoppingBasketIcon />
                          </Avatar>
                        </Badge>
                      ) : (
                        <Avatar>
                          <ShoppingBasketIcon />
                        </Avatar>
                      )}
                    </IconButton>
                  </Link>
                </Tooltip>
                <ButtonGroup
                  variant="contained"
                  aria-label="outlined primary button group"
                >
                  <Button component={RouterLink} to={`/login`}>
                    Log In
                  </Button>
                  <Button component={RouterLink} to={`/signup`}>
                    Sign Up
                  </Button>
                </ButtonGroup>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <NavBreadcrumbs
        location={location}
        productCategories={productCategories}
      />
      <Drawer
        variant="temporary"
        open={drawerState}
        onClose={handleMenuClick}
        sx={{
          display: { sm: "block", md: "none" },
          width: { xs: "100vw", sm: "auto" },
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: { xs: "100vw", sm: "fit-content" } },
        }}
      >
        <div style={{ height: `${appbarHeight}px` }} />
        <List
          sx={{ width: "100%", height: "100%", bgcolor: "background.paper" }}
          component="nav"
          aria-labelledby="nested-list-subheader"
        >
          <ListItemButton onClick={handleExpandProducts}>
            <ListItemIcon>
              <CategoryIcon />
            </ListItemIcon>
            <ListItemText primary="Products" />
            {expandProducts ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={expandProducts} timeout="auto">
            <List component="div" disablePadding>
              {productCategories &&
                productCategories.map((category, index) => (
                  <ListItemButton
                    component={RouterLink}
                    to={`/products/${category.name}`}
                    sx={{ pl: 6 }}
                    key={index}
                  >
                    <ListItemText primary={category.title} />
                  </ListItemButton>
                ))}
            </List>
          </Collapse>
        </List>
      </Drawer>
      <Snackbar
        open={snackbarStatus.open}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleClose}
          severity={snackbarStatus.type}
          sx={{ width: "100%" }}
        >
          {snackbarStatus.message}
        </Alert>
      </Snackbar>
      <Modal
        open={openSearch}
        onClose={() => setOpenSearch(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          component="form"
          onSubmit={handleSearchSubmit}
          noValidate
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90vw",
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <MobileSearch>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              onChange={({ target }) => setSearchTerm(target.value)}
              value={searchTerm}
            />
          </MobileSearch>
        </Box>
      </Modal>
    </>
  );
};
