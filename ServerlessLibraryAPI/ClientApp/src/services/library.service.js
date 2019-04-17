import { handleResponse } from "../helpers";
import { useMockApi } from "./index";

export const libraryService = {
  getAllSamples,
  submitNewSample,
  updateUserSentimentStats
};

function getAllSamples() {
  const requestOptions = {
    method: "GET"
  };

  return fetch("/api/Library", requestOptions).then(handleResponse);
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

function updateUserSentimentStats(id, likeChanges, dislikeChanges) {
  const requestOptions = {
    method: "PUT",
    body: '"' + id + '"',
    headers: {
      "Content-Type": "application/json"
    }
  };
  return fetch(
    "/api/metrics/sentiment/" + likeChanges + "/" + dislikeChanges,
    requestOptions
  ).then(handleResponse);
}
