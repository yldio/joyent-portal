import { canUseDOM } from 'exenv';
import queryString from 'query-string';

export const Global = () => {
  if (!canUseDOM) {
    return {
      cookie: ''
    };
  }

  return {
    port: window.location.port,
    protocol: window.location.protocol.replace(/:$/, ''),
    hostname: window.location.hostname,
    pathname: window.location.pathname,
    origin: window.location.origin,
    cookie: document.cookie || '',
    search: window.location.search,
    query: queryString.parse(window.location.search || ''),
    __REDUX_DEVTOOLS_EXTENSION__: window.__REDUX_DEVTOOLS_EXTENSION__,
    __APOLLO_STATE__: window.__APOLLO_STATE__,
    __REDUX_STATE__: window.__REDUX_STATE__
  };
};

export default Global();
