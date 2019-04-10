import { handleResponse } from "../helpers";
import { useMockApi } from "./index";

export const userService = {
  getCurrentUser,
  logout
};

const validUser = {
  firstName: "Aaaaaaaaa",
  fullName: "Aaaaaaaaa Bbbbbbbb",
  email: "abc@xyz.com",
  avatarUrl: "https://avatars2.githubusercontent.com/u/45184761?v=4",
  userName: "aabbaabb"
};

// const invalidUser = {
//   abc: 'xyz'
// };

function getMockUser() {
  return Promise.resolve(validUser);
  // return Promise.reject("No User is signed in!!");
}

function getCurrentUser() {
  if (useMockApi) {
    return getMockUser();
  }

  const requestOptions = {
    method: "GET"
  };
  return fetch("/api/user", requestOptions).then(handleResponse);
}

function logout() {
  if (useMockApi) {
    return Promise.resolve();
  }

  const requestOptions = {
    method: "GET"
  };
  return fetch("/api/user/logout", requestOptions).then(handleResponse);
}
