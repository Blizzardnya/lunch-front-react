import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import {
  Badge,
  Button,
  Toolbar,
  List,
  CssBaseline,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import MuiDrawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import StoreIcon from "@mui/icons-material/LocalMall";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { useNavigate, useLocation } from "react-router";

import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { selectTotalCartItems } from "../redux/slices/cartSlice";
import { logout } from "../redux/slices/accountSlice";
import { getAppBarTitle } from "../utils/placeholders";

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

export default function MiniDrawer() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const loggedIn = useAppSelector((state) => state.account.loggedIn);
  const cartItemsCount = useAppSelector((state) => selectTotalCartItems(state));

  const toggleDrawer = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const title = getAppBarTitle(location.pathname);
    setTitle(title);
    document.title = title;
  }, [location]);

  return (
    <>
      <CssBaseline />
      <AppBar position="absolute" open={open}>
        <Toolbar sx={{ pr: "24px" }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            {title}
          </Typography>
          <IconButton
            color="inherit"
            onClick={() => navigate("/cart")}
            size="large"
          >
            <Badge badgeContent={cartItemsCount} color="info">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          {!loggedIn ? (
            <Button color="inherit" onClick={() => navigate("/login")}>
              Войти
            </Button>
          ) : (
            <Button color="inherit" onClick={() => dispatch<any>(logout())}>
              Выйти
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            px: [1],
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List>
          <ListItem button onClick={() => navigate("/")}>
            <ListItemIcon>
              <StoreIcon />
            </ListItemIcon>
            <ListItemText primary="Товары" />
          </ListItem>
          <ListItem button onClick={() => navigate("/cart")}>
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="Корзина" />
          </ListItem>
          {loggedIn && (
            <ListItem button onClick={() => navigate("/account")}>
              <ListItemIcon>
                <AccountBoxIcon />
              </ListItemIcon>
              <ListItemText primary="Аккаунт" />
            </ListItem>
          )}
        </List>
      </Drawer>
    </>
  );
}
