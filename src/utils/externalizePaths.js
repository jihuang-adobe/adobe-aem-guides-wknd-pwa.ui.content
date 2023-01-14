import { contentPath, apiHost } from "./index";
const { REACT_APP_USE_PROXY } = process.env;


export const externalizePaths = (json) => {
  let data = json;

  if (!REACT_APP_USE_PROXY) data = _processModelJson(json);

  return data;
}

const acceptContent = (value) => {
  return value.match(/^\/content\/.*\.(jpg|jpeg|gif|png|wepb|html)$/i);
}


const rewriteFn = (value) => {
  if (value.startsWith(contentPath) && value.match(/^\/content\/.*\.(html)$/)) {
    value = value.substring(contentPath.length);

  } else if (value.match(/^\/content\/.*\.(jpg|jpeg|gif|png|wepb)$/)) {
    if (apiHost.endsWith("/") && value.startsWith("/")) {
      value = apiHost + value.substring(1);
    } else {
      value = apiHost + value;
    }
  }

  return value;
}

const _processModelJson = (jsonObject) => {
  Object.keys(jsonObject).forEach(function (propertyName) {
    if (jsonObject[propertyName] !== null && typeof jsonObject[propertyName] === 'object') {
      _processModelJson(jsonObject[propertyName]);
      return;
    }

    if (
      typeof jsonObject[propertyName] === 'string' &&
      acceptContent(jsonObject[propertyName])
    ) {
      jsonObject[propertyName] = rewriteFn(jsonObject[propertyName]);
    }
  });
  return jsonObject;
}
