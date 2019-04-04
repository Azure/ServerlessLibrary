import { handleResponse } from '../helpers';

export const userService = {
  getCurrentUser,
  isAuthenticated
};

const useFakeApi = true;

const validUser = {
  firstName: 'Nehaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
  lastName: 'Gupta',
  fullName: 'Neha Gupta',
  avatarUrl: 'https://github.com/msnehagup.png'
};

// const invalidUser = {
//   abc: 'xyz'
// };

// const noUser = null;

const getFakeUser = () => {
  return Promise.resolve(validUser);
  // return Promise.resolve(noUser);
};

function getCurrentUser() {
  if (useFakeApi) {
    return getFakeUser();
  }
  
  const requestOptions = {
    method: 'GET'
  };  
  return fetch('/api/user', requestOptions)
    .then(handleResponse);
}

function isAuthenticated() {
  return getCurrentUser().then(
    (user) => { return Promise.resolve(user && user.firstName && user.firstName !== ''); },
    () => { return Promise.resolve(false); }
  );
}
