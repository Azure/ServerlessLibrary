import { userActionTypes } from "../actions/actionTypes";
import initialState from "./initialState";

export default function authenticationReducer(
  state = initialState.authentication,
  action
) {
  switch (action.type) {
    case userActionTypes.GETCURRENTUSER_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        user: action.user
      };
    case userActionTypes.LOGOUT:
      return {
        ...state,
        loggedIn: false,
        user: {}
      };
    default:
      return state;
  }
}
