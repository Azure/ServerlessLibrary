import { combineReducers, createStore } from "redux";

import samples from "./sampleReducer";
import authentication from "./authenticationReducer";

const rootReducer = combineReducers({
  samples,
  authentication
});

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState);
}
