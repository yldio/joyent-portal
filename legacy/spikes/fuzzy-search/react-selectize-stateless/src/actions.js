const buildArray = require('build-array');
const delay = require('delay');
const faker = require('faker');

const actions =  {
  'FETCH': (state, action) => {
    return {
      ...state,
      items: (state.items || []).concat(action.payload)
    };
  }
};

const fetch = () => (dispatch, getState) => {

  return dispatch({
    type: 'FETCH',
    payload: () => {
      // debugger
      const {
        items = []
      } = getState();

      return buildArray(200).map((v, i) => {
        const id = items.length + i;

        return {
          id,
          name: faker.name.firstName(),
          meta: `${faker.name.firstName()}|${faker.random.number()}`,
          key: faker.image.imageUrl()
        };
      });
    }
  });
};

module.exports = (state, action) => {
  return actions[action.type]
    ? actions[action.type](state, action)
    : state;
};

module.exports.fetch = fetch;