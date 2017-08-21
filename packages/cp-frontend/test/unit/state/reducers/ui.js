import {
  _toggleServicesQuickActions,
  _toggleInstancesTooltip
} from '@state/reducers/ui';
import state from '@state/state';

describe('ui reducer', () => {

  it('toggleServicesQuickActions shows correctly', () => {
    const uiState = state.ui;
    const expectedUiState = {
      ...state.ui,
      services: {
        ...state.ui.services,
        quickActions: {
          show: true,
          position: {
            top: 10,
            left: 10
          },
          service: {
            id: 'service-id'
          }
        }
      }
    }
    const action = { payload: {
      show: true,
      position: {
        top: 10,
        left: 10
      },
      service: {
        id: 'service-id'
      }
    }};
    const result = _toggleServicesQuickActions(uiState, action);
    expect(result).toEqual(expectedUiState);
  });

  it('toggleServicesQuickActions hides correctly', () => {
    const uiState = state.ui;
    const expectedUiState = {
      ...state.ui,
      services: {
        ...state.ui.services,
        quickActions: {
          show: false
        }
      }
    }
    const action = { payload: { show: false }};
    const result = _toggleServicesQuickActions(uiState, action);
    expect(result).toEqual(expectedUiState);
  });

  it('toggleInstancesTooltip shows correctly', () => {
    const uiState = state.ui;
    const expectedUiState = {
      ...state.ui,
      instances: {
        ...state.ui.instances,
        tooltip: {
          show: true,
          position: {
            top: 10,
            left: 10
          },
          instance: {
            id: 'instance-id'
          },
          type: 'healthy'
        }
      }
    }
    const action = { payload: {
      show: true,
      position: {
        top: 10,
        left: 10
      },
      instance: {
        id: 'instance-id'
      },
      type: 'healthy'
    }};
    const result = _toggleInstancesTooltip(uiState, action);
    expect(result).toEqual(expectedUiState);
  });

  it('toggleServicesQuickActions hides correctly', () => {
    const uiState = state.ui;
    const expectedUiState = {
      ...state.ui,
      instances: {
        ...state.ui.instances,
        tooltip: {
          show: false
        }
      }
    }
    const action = { payload: { show: false }};
    const result = _toggleInstancesTooltip(uiState, action);
    expect(result).toEqual(expectedUiState);
  });
})
