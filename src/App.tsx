import React from "react";
import { BrowserRouter } from "react-router-dom";
import "fontsource-roboto";
import { PersistGate } from "redux-persist/es/integration/react";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";
import { Fab } from "@material-ui/core";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

import Navigation from "./components/Navigation";
import { persistor, store } from "./redux/store";
import ScrollTop from "./components/ScrollToTop";
import AppRouter from "./components/AppRouter";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <SnackbarProvider maxSnack={3}>
            <div style={{ display: "flex" }}>
              <nav>
                <Navigation />
              </nav>
              <main style={{ flexGrow: 1, padding: 24 }}>
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
              </main>
            </div>
          </SnackbarProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
