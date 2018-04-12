import { canUseDOM } from 'exenv';

export default (() => {
  if (!canUseDOM) {
    return {
      cookie: ''
    };
  }

  return {
    port: window.location.port,
    protocol: window.location.protocol.replace(/:$/, ''),
    hostname: window.location.hostname,
    origin: window.location.origin,
    cookie: document.cookie || '',
    __REDUX_DEVTOOLS_EXTENSION__: window.__REDUX_DEVTOOLS_EXTENSION__,
    __APOLLO_STATE__: window.__APOLLO_STATE__,
    __REDUX_STATE__: window.__REDUX_STATE__
  };
})();
