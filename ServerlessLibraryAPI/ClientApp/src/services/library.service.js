import { handleResponse } from "../helpers";
import { useMockApi } from "./index";

export const libraryService = {
  getAllSamples,
  submitNewSample,
  updateUserSentimentStats,
  updateDownloadCount
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
  return fetch("/api/library", requestOptions).then(response => {
    if (response.ok) {
      return response.json();
    }

    if (response.status === 400) {
      return response.json().then(json => Promise.reject(json));
    }

    return response
      .text()
      .then(text => Promise.reject(text || response.statusText));
  });
}

function updateUserSentimentStats(sentimentPayload) {
  const requestOptions = {
    method: "PUT",
    body: JSON.stringify(sentimentPayload),
    headers: {
      "Content-Type": "application/json"
    }
  };
  return fetch("/api/metrics/sentiment", requestOptions).then(handleResponse);
}

function updateDownloadCount(id) {
  const requestOptions = {
    method: "PUT",
    body: '"' + id + '"',
    headers: {
      "Content-Type": "application/json"
    }
  };
  return fetch("/api/metrics", requestOptions).then(handleResponse);
}
