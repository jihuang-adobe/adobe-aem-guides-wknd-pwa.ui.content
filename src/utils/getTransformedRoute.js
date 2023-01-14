import { PathUtils } from '@adobe/aem-spa-page-model-manager';
import { apiHost, contentPath } from './index';

export const getTransformedRoute = (path) => {
  let route = PathUtils.toAEMPath(path, apiHost, contentPath);
  return route;
}