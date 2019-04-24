import "./index.css";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { initializeIcons, Customizer } from "office-ui-fabric-react";
import { AzureCustomizationsLight } from "@uifabric/azure-themes";
import configureStore from "./reducers";
import registerCustomIcons from "./helpers/registerIcons";

import AppContainer from "./App";

const store = configureStore();
registerCustomIcons();
initializeIcons();
const rootElement = document.getElementById("root");
const customizations = AzureCustomizationsLight; // or alternatively AzureCustomizationsDark

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Customizer {...customizations}>
        <AppContainer />
      </Customizer>
    </Provider>
  </BrowserRouter>,
  rootElement
);

// leaving here to see the UI without the using the theme
// todo - remove after azure themes have been incorporated completely

// ReactDOM.render(
//   <BrowserRouter>
//     <Provider store={store}>
//       <AppContainer />
//     </Provider>
//   </BrowserRouter>,
//   rootElement
// );
