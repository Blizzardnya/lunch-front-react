import React from "react";
import { styled } from "@mui/material/styles";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Typography,
  Container,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useFormik } from "formik";
import * as yup from "yup";

import { useAppDispatch } from "../redux/hooks";
import { login } from "../redux/slices/accountSlice";

const PREFIX = "LoginPage";

const classes = {
  paper: `${PREFIX}-paper`,
  avatar: `${PREFIX}-avatar`,
  form: `${PREFIX}-form`,
  submit: `${PREFIX}-submit`,
};

const StyledContainer = styled(Container)(({ theme }) => ({
  [`& .${classes.paper}`]: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  [`& .${classes.avatar}`]: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },

  [`& .${classes.form}`]: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },

  [`& .${classes.submit}`]: {
    margin: theme.spacing(3, 0, 2),
    color: "#fff",
  },
}));

const validationSchema = yup.object({
  username: yup.string().required("Введите логин"),
  password: yup.string().required("Введите пароль"),
});

const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const { username, password } = values;
      dispatch<any>(login({ username, password }));
    },
  });

  return (
    <StyledContainer maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Авторизация
        </Typography>
        <form className={classes.form} onSubmit={formik.handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="username"
            label="Логин"
            name="username"
            autoComplete="username"
            autoFocus
            value={formik.values.username}
            onChange={formik.handleChange}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label="Пароль"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            size="large"
          >
            Войти
          </Button>
        </form>
      </div>
    </StyledContainer>
  );
};

export default LoginPage;
