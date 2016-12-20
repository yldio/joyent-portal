const transitionTo = (pathname) => (dispatch, getState) => {
  const {
    app: {
      router: {
        transitionTo
      }
    }
  } = getState();

  return dispatch({
    type: 'TRANSITION_TO',
    PAYLOAD: transitionTo(pathname)
  });
};

module.exports = {
  transitionTo
};
