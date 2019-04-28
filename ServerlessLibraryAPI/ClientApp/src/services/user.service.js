import { handleResponse, handleJsonResponse } from "../helpers";

export const userService = {
  getCurrentUser,
  logout
};

function getCurrentUser() {
  const requestOptions = {
    method: "GET"
  };
  return fetch("/api/user", requestOptions).then(handleJsonResponse);
}

function logout() {
  const requestOptions = {
    method: "GET"
  };
  return fetch("/api/user/logout", requestOptions).then(handleResponse);
}
