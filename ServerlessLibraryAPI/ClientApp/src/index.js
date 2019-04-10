import "./index.css";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { initializeIcons } from "@uifabric/icons";
import configureStore from "./reducers";

import AppContainer from "./App";

const store = configureStore();
initializeIcons();
const rootElement = document.getElementById("root");

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </BrowserRouter>,
  rootElement
);
