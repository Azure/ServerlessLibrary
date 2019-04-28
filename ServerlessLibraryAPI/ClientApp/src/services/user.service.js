import { handleResponse } from "../helpers";

export const userService = {
  getCurrentUser,
  logout
};

function getCurrentUser() {
  const requestOptions = {
    method: "GET"
  };
  return fetch("/api/user", requestOptions).then(handleResponse);
}

function logout() {
  const requestOptions = {
    method: "GET"
  };
  return fetch("/api/user/logout", requestOptions).then(handleResponse);
}
