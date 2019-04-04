export const contributionService = {
  submitNewItem
};

function submitNewItem(item) {
  console.log('submitting new item');
  console.log(item);
  return Promise.resolve(item);
}
