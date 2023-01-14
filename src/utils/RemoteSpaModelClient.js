import { ModelClient } from '@adobe/aem-spa-page-model-manager';
import auth from '@adobe/jwt-auth';
import { externalizePaths, contentPath } from './index';

const { PUBLIC_URL, REACT_APP_USE_PROXY } = process.env;

export class RemoteSpaModelClient extends ModelClient {
  constructor({ apiHost, authorization }) {
    super(apiHost);
    this.authorization = authorization || false;
  }

  async fetch(path) {
    if (!path) return Promise.reject(new Error('Rejected fetching empty path.'));

    let url = this.routeToAemPathFn(path);
    if (REACT_APP_USE_PROXY) url = this.routeToAemPathFn(path)
    else url = `${this._apiHost}${url}`;

    let headers = {};
    if (this.authorization) {
      headers.headers = await this._getHeaders(this.authorization);
    };

    return fetch(url, headers)
      .then((response) => response.ok ? response.json() : Promise.reject(response))
      .then((data) => externalizePaths(data))
      .catch((error) => {
        console.log("Error fetching", error)
        // return Promise.reject(error);
      });
  }

  async _getHeaders(auth) {
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');

    if (auth?.credentials) {
      const accessToken = await this._getAccessToken(auth.credentials);
      headers.append('Authorization', 'Bearer ' + accessToken);
    } else if (auth?.devToken) {
      headers.append('Authorization', 'Bearer ' + auth.devToken);

    } else if (auth?.basic && auth?.basic?.user && auth?.basic?.password) {
      const user = auth.basic.user;
      const password = auth.basic.password;

      headers.append('Authorization', 'Basic ' + btoa(user + ':' + password));
    }

    return headers;
  }

  async _getAccessToken(credentials) {

    // This is the Service Credentials JSON object that must be exchanged with Adobe IMS for an access token
    let serviceCredentials = credentials.integration;

    // Use the @adobe/jwt-auth library to pass the service credentials generated a JWT and exchange that with Adobe IMS for an access token.
    // If other programming languages are used, please see these code samples: https://www.adobe.io/authentication/auth-methods.html#!AdobeDocs/adobeio-auth/master/JWT/samples/samples.md
    let { access_token } = await auth({
      clientId: serviceCredentials.technicalAccount.clientId, // Client Id
      technicalAccountId: serviceCredentials.id,              // Technical Account Id
      orgId: serviceCredentials.org,                          // Adobe IMS Org Id
      clientSecret: serviceCredentials.technicalAccount.clientSecret, // Client Secret
      privateKey: serviceCredentials.privateKey,              // Private Key to sign the JWT
      metaScopes: serviceCredentials.metascopes.split(','),   // Meta Scopes defining level of access the access token should provide
      ims: `https://${serviceCredentials.imsEndpoint}`,       // IMS endpoint used to obtain the access token from
    });

    return access_token;
  }

  routeToAemPathFn(route) {
    if (route === PUBLIC_URL + '.model.json' || route === "/.model.json") {
      route = contentPath + '.model.json';

    } else if (route.startsWith(PUBLIC_URL)) {
      route = route.replace(PUBLIC_URL, contentPath);

    } else if (!route.startsWith(contentPath)) {
      route = contentPath + route;
    }

    return route;
  }
}