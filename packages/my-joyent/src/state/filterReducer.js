import { default as defaultState } from './state';

const selectedGroups = groups =>
  groups.filter(group => group.selected).map(group => group.name);

const filterReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'CHANGE_FILTERS':
      return {
        ...state,
        filters: {
          ...action.filters
        },
        packages: defaultState.packages
          .filter(
            pack =>
              pack.memory >= action.filters.ram.min &&
              pack.memory <= action.filters.ram.max
          )
          .filter(
            pack =>
              pack.disk >= action.filters.disk.min &&
              pack.disk <= action.filters.disk.max
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
          .filter(
            pack =>
                selectedGroups(action.filters.groups).length > 0 ? 
                  selectedGroups(action.filters.groups).includes(pack.group) : 
                  true
          )
      };

    case 'RESET_FILTERS':
      return {
        ...state,
        filters: {
          ...defaultState.filters
        },
        packages: defaultState.packages
      };
    default:
      return state;
  }
};

export default filterReducer;
