export { apiHost } from "./getApiHost";
export { contentPath, contentPathSuffix, site } from "./getContentPaths";
export { getRemoteImageSrc } from "./getRemoteImageSrc";
export { getRemoteSite } from "./getRemoteSite";
export { sanitizeActivity } from "./sanitizeActivity";
export { getCategoriesFromData } from "./getCategoriesFromData";
export { getCategoryItemsByKey } from "./getCategoryItemsByKey";
export { getTransformedRoute } from "./getTransformedRoute";
export { initModelManager } from "./initModelManager";
export { externalizePaths } from "./externalizePaths";

export const GraphQLSetupError = `Validation error of type FieldUndefined: Field 'adventureList' in type 'QueryType' is undefined @ 'adventureList'`;
export const setupErrorMessage = `The Adventures, Articles Content Fragment Models are either not created and installed, or need to be resaved.`
export const GlobalEndpointError = `SyntaxError: Unexpected token < in JSON at position 0`;
export const globalEndpointMessage = `The global GraphQL endpoint appears to not exist, not be setup, or there was an error in connecting.`