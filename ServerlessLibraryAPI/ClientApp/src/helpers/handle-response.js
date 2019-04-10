export function handleResponse(response) {
  return response.text().then(text => {
    if (!response.ok) {
      const error = text || response.statusText;
      return Promise.reject(error);
    }

    const json = text && JSON.parse(text);
    return json;
  });
}
