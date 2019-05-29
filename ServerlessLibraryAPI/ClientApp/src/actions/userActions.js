import { userActionTypes } from "./actionTypes";

export const userActions = {
  getCurrentUserRequest,
  getCurrentUserSuccess,
  getCurrentUserFailure,
  logout
};

function getCurrentUserRequest(user) {
  return {
    type: userActionTypes.GETCURRENTUSER_REQUEST,
    user
  };
}

function getCurrentUserSuccess(user) {
  return {
    type: userActionTypes.GETCURRENTUSER_SUCCESS,
    user
  };
}

function getCurrentUserFailure(user) {
  return {
    type: userActionTypes.GETCURRENTUSER_FAILURE,
    user
  };
}

function logout() {
  return {
    type: userActionTypes.LOGOUT
  };
}
