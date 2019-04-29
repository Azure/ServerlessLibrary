import { handleResponse, handleJsonResponse } from "../helpers";
import { trackException } from "../helpers/appinsights";

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

  return fetch("/api/Library", requestOptions).then(handleJsonResponse);
}

function submitNewSample(item) {
  const requestOptions = {
    method: "PUT",
    body: JSON.stringify(item),
    headers: {
      "Content-Type": "application/json"
    }
  };
  return fetch("/api/library", requestOptions)
    .then(handleJsonResponse)
    .catch(data => {
      let error = data.error;
      if (data.status === 400) {
        try {
          error = JSON.parse(data.error);
        } catch (ex) {
          trackException(ex, { method: "submitNewSample" });
        }
      }
      return Promise.reject({
        status: data.status,
        error: error
      });
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
  return fetch("/api/metrics/downloads", requestOptions).then(handleResponse);
}
