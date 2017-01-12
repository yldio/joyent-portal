const toggleCollapsed = (state, action) => {
  const {
    ui
  } = state;

  const {
    collapsed = []
  } = ui;

  const _collapsed = collapsed.indexOf(action.payload) >= 0
    ? collapsed.filter((uuid) => uuid !== action.payload)
    : [...collapsed, action.payload];

  return {
    ...state,
    ui: {
      ...ui,
      collapsed: _collapsed
    }
  };
};

module.exports = {
  toggleCollapsed
};
