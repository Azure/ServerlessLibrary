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
      console.log(error); // todo - http error - should be tracked
      return Promise.reject(error);
    });
  } catch (e) {
    console.log(e); // todo - unexpected exception - should be logged
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
    } catch (e) {
      console.log(e); // todo - unexpected exception - should be tracked
      return Promise.reject({
        status: -1,
        error: "Encountered unexpected exception."
      });
    }
  });
}
