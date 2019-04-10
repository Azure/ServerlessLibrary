import { handleResponse } from "../helpers";

export const contributionService = {
  submitNewItem
};

const useMockApi = true;

function submitNewItem(item) {
  console.log("submitting new item");
  console.log(item);

  if (useMockApi) {
    item.id = "someid"; // id and author are set by the backend api
    item.author = "someauthor";
    return Promise.resolve(item);
  }

  const requestOptions = {
    method: "PUT",
    body: JSON.stringify(item),
    headers: {
      "Content-Type": "application/json"
    }
  };
  return fetch("/api/library", requestOptions).then(handleResponse);
}
