import { IntlProvider } from 'react-intl-redux';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import a11y from 'react-a11y';
import ReactDOM from 'react-dom';
import React from 'react';

import App from '@containers/app';
// import MockState from './mock-state.json';
import MockStateTesting from './mock-state-testing.json';
import Datasets from './datasets.json';
import Store from '@state/store';

if (process.env.NODE_ENV !== 'production') {
  a11y(React, {
    ReactDOM
  });
}

// TODO want ot be able to switch whic mock state to use
// based on a query string
const mockState = MockStateTesting;

// TMP - ensure datasets are at least 2 hrs long - START
import getTwoHourDatasets from './utils/two-hour-metric-datasets';
const twoHourLongDatasets = getTwoHourDatasets(Datasets);
// TMP - ensure datasets are at least 2 hrs long - END

// TMP - plug fake metric data - START
const datasets = mockState.metrics.data.datasets.map((dataset, index) => {
  const keyIndex = index%2 ? 0 : 1;
  const key = Object.keys(twoHourLongDatasets)[keyIndex];
  return {
    ...dataset,
    data: twoHourLongDatasets[key]
  };
});

mockState.metrics.data.datasets = datasets;
// TMP - plug fake metric data - END

ReactDOM.render(
  <Provider store={Store(mockState)}>
    <IntlProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </IntlProvider>
  </Provider>,
  document.getElementById('root')
);
