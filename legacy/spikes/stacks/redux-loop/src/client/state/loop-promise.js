const ReduxActions = require('redux-actions');
const ReduxLoop = require('redux-loop');

const {
  Effects
} = ReduxLoop;

const {
  createAction
} = ReduxActions;

module.exports = ({
  type,
  payload,
  ctx
}) => {
  return Effects.batch([
    Effects.constant({
      type: `${type}_PENDING`
    }),
    Effects.promise(() => {
      return payload
      .then((res) => {
        return {
          type: `${type}_FULFILLED`,
          payload: res,
          ctx
        };
      })
      .catch((err) => {
        return {
          type: `${type}_REJECTED`,
          payload: err,
          ctx
        };
      });
    })
  ]);
};
