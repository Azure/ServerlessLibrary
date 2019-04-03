export const userService = {
  getCurrentUser,
  isAuthenticated
};

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

function isAuthenticated() {
  return getCurrentUser().then(
    (user) => { return Promise.resolve(user && user.firstName && user.firstName !== ''); },
    () => { return Promise.resolve(false); }
  );
}

function getCurrentUser() {
  return Promise.resolve(validUser);
  // return Promise.resolve(noUser);
}
