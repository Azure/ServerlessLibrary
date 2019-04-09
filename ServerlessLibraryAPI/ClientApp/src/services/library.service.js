export const libraryService = {
  getAllSamples
};

function getAllSamples() {
  const requestOptions = {
    method: "GET"
  };
  return fetch("https://www.serverlesslibrary.net/api/Library", requestOptions)
    .then(response => response.json())
    .then(data => {
      return data;
    });
}
