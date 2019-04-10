import { handleResponse } from "../helpers";

export const userService = {
  getCurrentUser,
  logout
};

const useMockApi = true;

const validUser = {
  firstName: "Nehaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  lastName: "Gupta",
  fullName: "Neha Gupta",
  avatarUrl: "https://github.com/msnehagup.png"
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
