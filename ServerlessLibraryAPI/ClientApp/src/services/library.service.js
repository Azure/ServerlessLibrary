import { handleResponse } from "../helpers";
import { useMockApi } from "./index";

export const libraryService = {
  getAllSamples,
  submitNewSample,
  updateUserActionStats
};

function getAllSamples() {
  const requestOptions = {
    method: "GET"
  };

  return fetch(
    "https://www.serverlesslibrary.net/api/Library",
    requestOptions
  ).then(handleResponse);
}

function submitNewSample(item) {
  item.type = "functionapp"; // todo - these props should come from the contribution form
  item.runtimeversion = "v2";
  item.language = "javascript";

  if (useMockApi) {
    item.id = "someid"; // id and author are set by the backend api
    item.author = "msnehagup";
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

function updateUserActionStats(template, userAction){
  const requestOptions = {
    method: "PUT",
    body: '"' + template + '"',
    headers: {
      "Content-Type": "application/json"
    }
  };
  return fetch("/api/metrics/"+ userAction, requestOptions).then(handleResponse);
}
