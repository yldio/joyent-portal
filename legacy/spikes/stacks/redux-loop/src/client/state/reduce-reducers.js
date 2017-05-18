const ReduxLoop = require('redux-loop');

const {
  loop,
  isLoop,
  getEffect,
  getModel,
  Effects
} = ReduxLoop;

const optimizeBatch = (effects) => {
  switch(effects.length) {
    case 0:
      return Effects.none();
    case 1:
      return effects[0];
    default:
      return Effects.batch(effects);
  }
};

module.exports = (...reducers) => {
  return (state, action) => {
    const effects = [];

    const next = reducers.reduce((sum, reducer) => {
      let state = reducer(sum, action);

      if (!isLoop(state)) {
        return state;
      }

      effects.push(getEffect(state));
      state = getModel(state);

      return state;
    }, state);

    return loop(
      next,
      optimizeBatch(effects)
    );
  };
};
