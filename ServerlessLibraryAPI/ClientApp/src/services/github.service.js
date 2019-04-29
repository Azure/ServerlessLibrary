import { handleResponse } from "../helpers";

export const githubService = {
  getReadMe,
  getLicense,
  getArmTemplate
};

function getRawContentUrl(repoUrl, fileName) {
  let rawUrl = repoUrl
    .replace("https://github.com", "https://raw.githubusercontent.com")
    .replace("/tree/", "/");
  rawUrl = rawUrl.includes("/master/") ? rawUrl + "/" : rawUrl + "/master/";
  let contentUrl = rawUrl + fileName;
  return contentUrl;
}

function getReadMe(repoUrl) {
  const requestOptions = {
    method: "GET"
  };
  const readMeUrl = getRawContentUrl(repoUrl, "README.md");
  return fetch(readMeUrl, requestOptions).then(handleResponse);
}

function getLicense(licenseUrl, repoUrl) {
  const requestOptions = {
    method: "GET"
  };
  const contentUrl = licenseUrl || getRawContentUrl(repoUrl, "LICENSE");
  return fetch(contentUrl, requestOptions).then(handleResponse);
}

function getArmTemplate(templateUrl) {
  const requestOptions = {
    method: "GET"
  };
  return fetch(templateUrl, requestOptions).then(handleResponse);
}
