export function queryStringToParams(queryString) {
  if (queryString.indexOf("?") > -1) {
    queryString = queryString.split("?")[1];
  }
  var pairs = queryString.split("&");
  var result = {};
  pairs.forEach(function(pair) {
    pair = pair.split("=");
    if (pair[0] && pair[0].length > 0) {
      result[pair[0]] = decodeURIComponent(pair[1] || "");
    }
  });
  return result;
}

export function paramsToQueryString(params) {
  var queryString = Object.keys(params)
    .map(key => {
      return encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
    })
    .join("&");
  return "?" + queryString;
}
