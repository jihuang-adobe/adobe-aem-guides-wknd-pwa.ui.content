const { REACT_APP_HOST_URI } = process.env;

export const apiHost = REACT_APP_HOST_URI === "/" ? window.top.location.origin : REACT_APP_HOST_URI;