import { default as defaultState } from './state';
const filterReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'CHANGE_FILTERS':
      console.log(state);
      return {
        ...state,
        ...action.filters,
        packages: defaultState.packages
          .filter(
            pack =>
              pack.memory >= action.filters.ram.min &&
              pack.memory <= action.filters.ram.max
          )
          .filter(
            pack =>
              pack.disk / 1000 >= action.filters.disk.min &&
              pack.disk / 1000 <= action.filters.disk.max
          )
          .filter(
            pack =>
              pack.vcpus >= action.filters.cpu.min &&
              pack.vcpus <= action.filters.cpu.max
          )
          .filter(
            pack =>
              pack.price >= action.filters.cost.min &&
              pack.price <= action.filters.cost.max
          )
      };
    default:
      return state;
  }
};

export default filterReducer;
