import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ruRU } from "@mui/material/locale";

import { store } from "../redux/store";

export const theme = createTheme(
  {
    palette: {
      primary: { main: "#00B294", contrastText: "white" },
    },
  },
  ruRU
);

function AppWrapper({ children }: any) {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <SnackbarProvider maxSnack={3}>{children}</SnackbarProvider>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default AppWrapper;
