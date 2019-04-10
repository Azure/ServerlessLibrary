import { userActionTypes } from "./actionTypes";

export const userActions = {
  getCurrentUserSuccess,
  logout
};

function getCurrentUserSuccess(user) {
  return {
    type: userActionTypes.GETCURRENTUSER_SUCCESS,
    user
  };
}

function logout() {
  return {
    type: userActionTypes.LOGOUT
  };
}
