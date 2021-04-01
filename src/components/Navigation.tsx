import React, { useEffect } from "react";
import clsx from "clsx";
import {
  createStyles,
  makeStyles,
  useTheme,
  Theme,
} from "@material-ui/core/styles";
import {
  Badge,
  Button,
  Drawer,
  AppBar,
  Toolbar,
  List,
  CssBaseline,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import StoreIcon from "@material-ui/icons/LocalMall";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import { useHistory } from "react-router";

import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { selectTotalCartItems } from "../redux/slices/cartSlice";
import { logout } from "../redux/slices/accountSlice";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    title: {
      flexGrow: 1,
      color: "#fff",
    },
    menuButton: {
      marginRight: 36,
      color: "#fff",
    },
    hide: {
      display: "none",
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: "nowrap",
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: "hidden",
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9) + 1,
      },
    },
    toolbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    white_button: {
      color: "#fff",
    },
  })
);

export default function MiniDrawer() {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const dispatch = useAppDispatch();

  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const loggedIn = useAppSelector((state) => state.account.loggedIn);
  const cartItemsCount = useAppSelector((state) => selectTotalCartItems(state));

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  function getAppBarTitle(pathname: string) {
    switch (pathname) {
      case "/":
        return "Магазин";
      case "/cart":
        return "Корзина";
      case "/account":
        return "Аккаунт";
      case "/login":
        return "Авторизация";
      default:
        return "";
    }
  }

  useEffect(() => {
    const unlisten = history.listen((location) => {
      setTitle(getAppBarTitle(location.pathname));
    });
    return () => {
      unlisten();
    };
  });

  return (
    <>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {title}
          </Typography>
          <IconButton
            className={classes.white_button}
            color="inherit"
            onClick={() => history.push("/cart", { title: "Корзина" })}
          >
            <Badge badgeContent={cartItemsCount} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          {!loggedIn ? (
            <Button
              className={classes.white_button}
              color="inherit"
              onClick={() => history.push("/login")}
            >
              Войти
            </Button>
          ) : (
            <Button
              className={classes.white_button}
              color="inherit"
              onClick={() => dispatch(logout())}
            >
              Выйти
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Toolbar id="back-to-top-anchor" />
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button onClick={() => history.push("/")}>
            <ListItemIcon>
              <StoreIcon />
            </ListItemIcon>
            <ListItemText primary="Товары" />
          </ListItem>
          <ListItem button onClick={() => history.push("/cart")}>
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="Корзина" />
          </ListItem>
          {loggedIn ? (
            <ListItem button onClick={() => history.push("/account")}>
              <ListItemIcon>
                <AccountBoxIcon />
              </ListItemIcon>
              <ListItemText primary="Аккаунт" />
            </ListItem>
          ) : (
            <></>
          )}
        </List>
      </Drawer>
    </>
  );
}
