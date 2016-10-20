const transitionTo = (pathname) => (dispatch, getState) => {
  const {
    app: {
      router: {
        transitionTo
      }
    }
  } = getState();

  return transitionTo(pathname);
};

module.exports = {
  transitionTo
};
