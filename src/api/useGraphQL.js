/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/
import { useState, useEffect } from 'react';
import { AEMHeadless } from "@adobe/aem-headless-client-js";
import { externalizePaths } from '../utils';

const {
  REACT_APP_HOST_URI,
  REACT_APP_GRAPHQL_ENDPOINT,
  REACT_APP_AUTHORIZATION
} = process.env;

/**
 * Custom React Hook to perform a GraphQL query
 * @param query - GraphQL query
 * @param path - Persistent query path
 */
export function useGraphQL(query, path) {
  let [graphQLData, setGraphQLData] = useState(null);
  let [errors, setErrors] = useState(null);

  useEffect(() => {
    const config = {
      serviceURL: REACT_APP_HOST_URI,
      endpoint: REACT_APP_GRAPHQL_ENDPOINT,
    };
    if (REACT_APP_AUTHORIZATION) config.auth = REACT_APP_AUTHORIZATION.split(":");

    const sdk = new AEMHeadless(config);
    const request = query ? sdk.runQuery.bind(sdk) : sdk.runPersistedQuery.bind(sdk);

    request(query || path)
      .then(({ data, errors }) => {
        if (errors) setErrors(mapErrors(errors));
        if (data) setGraphQLData(externalizePaths(data));
      })
      .catch((error) => {
        setGraphQLData(false);
        setErrors(error);
      });
  }, [query, path]);

  return { graphQLData, errors }
}

/**
 * concatenate error messages into a single string.
 * @param {*} errors
 */
export function mapErrors(errors) {
  return errors.map((error) => error.message ? error.message : error).join(",");
}
