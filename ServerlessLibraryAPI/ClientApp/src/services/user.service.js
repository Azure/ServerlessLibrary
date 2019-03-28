export const userService = {
  getCurrentUser
};

const dummyUser = {
  firstName: 'Nehaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
  lastName: 'Gupta',
  fullName: 'Neha Gupta',
  avatarUrl: 'https://github.com/msnehagup.png'
};

function getCurrentUser() {
  return Promise.resolve(dummyUser);
}
