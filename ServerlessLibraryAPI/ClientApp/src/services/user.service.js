import { handleResponse } from "../helpers";

export const userService = {
  getCurrentUser
};

const useFakeApi = true;

const getFakeUser = () => {
  return Promise.resolve({
    fullName: "Aaaaaaaaaaaaaaaaaaa Bbbbbbbbbbbb",
    email: "abc@xyz.com",
    avatarUrl: "https://avatars2.githubusercontent.com/u/45184761?v=4",
    firstName: "Aaaaaaaaaaaaaaaaaaa"
  });
};

function getCurrentUser() {
  if (useFakeApi) {
    return getFakeUser();
  }

  const requestOptions = {
    method: "GET"
  };
  return fetch("/api/user", requestOptions).then(handleResponse);
}
