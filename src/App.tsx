import React from "react";
import { BrowserRouter } from "react-router-dom";
import "fontsource-roboto";
import { PersistGate } from "redux-persist/es/integration/react";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";
import { Box, Fab } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { ThemeProvider, Theme, createTheme } from "@mui/material/styles";
import { ruRU } from "@mui/material/locale";

import Navigation from "./components/Navigation";
import { persistor, store } from "./redux/store";
import ScrollTop from "./components/ScrollToTop";
import AppRouter from "./components/AppRouter";

declare module "@mui/styles/defaultTheme" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

const theme = createTheme(
  {
    palette: {
      primary: { main: "#00B294", contrastText: "white" },
    },
  },
  ruRU
);

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <SnackbarProvider maxSnack={3}>
              <Box sx={{ display: "flex" }}>
                <Navigation />
                <Box
                  component="main"
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === "light"
                        ? theme.palette.grey[100]
                        : theme.palette.grey[900],
                    flexGrow: 1,
                    height: "100vh",
                    overflow: "auto",
                    paddingTop: 3,
                  }}
                >
                  <AppRouter />
                  <ScrollTop>
                    <Fab
                      color="secondary"
                      size="small"
                      aria-label="scroll back to top"
                    >
                      <KeyboardArrowUpIcon />
                    </Fab>
                  </ScrollTop>
                </Box>
              </Box>
            </SnackbarProvider>
          </ThemeProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
