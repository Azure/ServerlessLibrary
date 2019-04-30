// These must be the first lines in src/index.js
import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";

import "./index.css";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { initializeIcons } from "office-ui-fabric-react";
import configureStore from "./reducers";
import registerCustomIcons from "./helpers/registerIcons";

import AppContainer from "./App";

const store = configureStore();
registerCustomIcons();
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
