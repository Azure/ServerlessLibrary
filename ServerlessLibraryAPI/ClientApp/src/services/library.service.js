import { handleResponse } from "../helpers";

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

  return fetch("/api/Library", requestOptions)
    .then(handleResponse)
    .then(data => {
      try {
        return JSON.parse(data);
      } catch (e) {
        console.log(e); // todo - unexpected exception - should be tracked
        return Promise.reject({
          status: -1,
          error: "Encountered unexpected exception."
        });
      }
    });
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
    .then(handleResponse)
    .then(data => {
      try {
        return JSON.parse(data);
      } catch (e) {
        console.log(e); // todo - unexpected exception - should be tracked
        return Promise.reject({
          status: -1,
          error: "Encountered unexpected exception."
        });
      }
    })
    .catch(data => {
      let error = data.error;
      if (data.status === 400) {
        try {
          error = JSON.parse(data.error);
        } catch (e) {
          console.log(e); // todo - unexpected exception - should be tracked
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
  return fetch("/api/metrics", requestOptions).then(handleResponse);
}
