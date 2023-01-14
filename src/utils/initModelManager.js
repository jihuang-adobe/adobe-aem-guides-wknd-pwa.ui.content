import { ModelManager } from "@adobe/aem-spa-page-model-manager";
import { RemoteSpaModelClient } from "./RemoteSpaModelClient";
import { apiHost } from "./getApiHost";

const { REACT_APP_AUTHORIZATION } = process.env;

const config = { apiHost: apiHost };

if (REACT_APP_AUTHORIZATION) {
  config.authorization = {
    basic: {
      user: REACT_APP_AUTHORIZATION?.split(':')[0],
      password: REACT_APP_AUTHORIZATION?.split(':')[1],
    }
  }
}

export const initModelManager = (path) => {
  ModelManager.initializeAsync({
    modelClient: new RemoteSpaModelClient(config),
    path: path
  });
}
