import { trackError, trackException } from "./appinsights";

export function handleResponse(response) {
  try {
    return response.text().then(text => {
      if (response.ok) {
        return text;
      }
      const error = {
        status: response.status,
        error: text || response.statusText
      };
      trackError(error.error, { ...error, url: response.url });
      return Promise.reject(error);
    });
  } catch (ex) {
    trackException(ex, { url: response.url, method: "handleResponse" });
    return Promise.reject({
      status: -1,
      error: "Encountered unexpected exception."
    });
  }
}

export function handleJsonResponse(response) {
  return handleResponse(response).then(data => {
    try {
      return JSON.parse(data);
    } catch (ex) {
      trackException(ex, { url: response.url, method: "handleJsonResponse" });
      return Promise.reject({
        status: -1,
        error: "Encountered unexpected exception."
      });
    }
  });
}
