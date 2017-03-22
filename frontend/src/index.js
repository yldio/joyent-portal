import { IntlProvider } from 'react-intl-redux';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import qs from 'querystring';
import a11y from 'react-a11y';
import ReactDOM from 'react-dom';
import React from 'react';

import App from '@containers/app';
import MockStateTesting from './mock-state-testing.json';
import MockState from './mock-state.json';
import LeakDatasets from './dataset-leak.json';
import NormalDatasets from './dataset-normal.json';
import Store from '@state/store';

if (process.env.NODE_ENV !== 'production') {
  a11y(React, {
    ReactDOM
  });
}

const states = {
  all: MockState,
  testing: MockStateTesting
}

const query = qs.parse(window.location.search.replace(/^\?/, ''));
const mockState = states[query.mock || 'testing'];

// node_memory_rss_bytes
// node_memory_heap_total_bytes
// node_memory_heap_used_bytes
// process_heap_bytes
// process_resident_memory_bytes
// process_virtual_memory_bytes
// process_cpu_seconds_total
// process_cpu_system_seconds_total
// process_cpu_user_seconds_total
// node_lag_duration_milliseconds
// http_request_duration_milliseconds

// node_memory_rss_bytes
// node_memory_heap_total_bytes
// node_memory_heap_used_bytes
// process_heap_bytes
// process_resident_memory_bytes
// process_virtual_memory_bytes
// process_cpu_seconds_total
// process_cpu_system_seconds_total
// process_cpu_user_seconds_total
// node_lag_duration_milliseconds
// http_request_duration_milliseconds

// TMP - ensure datasets are at least 2 hrs long - START
import getTwoHourDatasets from './utils/two-hour-metric-datasets';
const leakTwoHourLongDatasets = getTwoHourDatasets(LeakDatasets);
const normalTwoHourLongDatasets = getTwoHourDatasets(NormalDatasets);
// TMP - ensure datasets are at least 2 hrs long - END

// TMP - plug fake metric data - START
const isCrazy = (uuid) => uuid === 'crazy-cpu' ||
  uuid === 'crazy-disk' || uuid === 'crazy-memory';

const isCPU = (uuid) => uuid === 'crazy-cpu'
  || uuid === '3e6ee79a-7453-4fc6-b9da-7ae1e41138ec';

const isDisk = (uuid) => uuid === 'crazy-disk'
  || uuid === '4e6ee79a-7453-4fc6-b9da-7ae1e41138ed';

const isMemory = (uuid) => uuid === 'crazy-memory'
  || uuid === '6e6ee79a-7453-4fc6-b9da-7ae1e41138ed';

const getDataset = (twoHourLongDatasets, uuid) => {
  if(isCPU(uuid)) {
    return twoHourLongDatasets.process_cpu_seconds_total;
  }
  if(isDisk(uuid)) {
    return twoHourLongDatasets.process_heap_bytes.map((sample) =>
      [
        sample[0],
        sample[1]/1024/1024
      ]
    );
  }
  if(isMemory(uuid)) {
    return twoHourLongDatasets.node_memory_heap_used_bytes.map((sample) =>
      [
        sample[0],
        sample[1]/1024/1024
      ]
    );
  }
};

const datasets = MockState.metrics.data.datasets.map((dataset, index) => {

  const data = isCrazy(dataset.uuid) && dataset.uuid !== 'crazy-cpu' ?
    getDataset(leakTwoHourLongDatasets, dataset.uuid) :
    getDataset(normalTwoHourLongDatasets, dataset.uuid);

  return {
    ...dataset,
    data: data
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
