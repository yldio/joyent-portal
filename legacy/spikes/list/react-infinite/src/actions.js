const buildArray = require('build-array');
const delay = require('delay');
const faker = require('faker');

const actions =  {
  'FETCH_FULFILLED': (state, action) => {
    return {
      ...state,
      fetching: false,
      items: (state.items || []).concat(action.payload)
    };
  },
  'FETCH_PENDING': (state, action) => {
    return {
      ...state,
      fetching: true
    };
  },
  'FILTER_PENDING': (state, action) => {
    return {
      ...state,
      fetching: true
    };
  },
  'FILTER_FULFILLED': (state, action) => {
    return {
      ...state,
      fetching: false,
      filtered: action.payload.length !== state.items.length
        ? action.payload
        : null
    };
  },
};

const fetch = () => (dispatch, getState) => {
  const {
    filtered
  } = getState();

  if (filtered) {
    return;
  }

  return dispatch({
    type: 'FETCH',
    payload: delay(500).then(() => {
      const {
        items = []
      } = getState();

      return buildArray(100000).map((v, i) => {
        const id = items.length + i;

        return {
          id,
          title: `test ${id}`,
          description: faker.lorem.sentence(),
          image: faker.image.imageUrl(),
          date: faker.date.recent()
        };
      });
    })
  });
};

const filter = (payload) => (dispatch, getState) => {
  const regexp = new RegExp(payload);

  return dispatch({
    type: 'FILTER',
    payload: delay(500).then(() => {
      const {
        items = []
      } = getState();

      return items.filter((item) => {
        return regexp.test(item.title);
      }).sort((a, b) => a.id - b.id);
    })
  });
};

module.exports = (state, action) => {
  return actions[action.type]
    ? actions[action.type](state, action)
    : state;
};

module.exports.fetch = fetch;
module.exports.filter = filter;
