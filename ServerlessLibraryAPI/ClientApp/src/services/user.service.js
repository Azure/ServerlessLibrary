import { handleResponse } from "../helpers";

export const userService = {
  getCurrentUser,
  isAuthenticated
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

function isAuthenticated() {
  return getCurrentUser().then(
    user => {
      return Promise.resolve(user && user.firstName && user.firstName !== "");
    },
    () => {
      return Promise.resolve(false);
    }
  );
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
