/* eslint-disable */
// This needs to be at least two hours long
// We need to establish the start time and calculate what the end time is - two hours later
// Then, add the dataset to the array, and calculate its duration
// Then keep adding the dataset to the array, updating each values timstamp with the duration diff * adding,
// until we have data that's at least two hours long
/* eslint-enable */

import moment from 'moment';

const getTwoHourDatasets = (Datasets) => {

  return Object.keys(Datasets).reduce((datasets, key) => {
    const dataset = Datasets[key];

    const datasetStart = moment(dataset[0][0], 'X');
    const datasetEnd = moment(dataset[dataset.length - 1][0], 'X');
    const datasetDuration = moment(datasetEnd.valueOf())
      .subtract(datasetStart.valueOf()).valueOf();

    // number of times we need to add the dataset
    // so that it's at least 2 hrs long
    const count = Math.ceil(moment.duration(2, 'hours')
      .valueOf()/datasetDuration);

    // update each data's timestamp depending on round of being added
    const getDataset = (dataset, duration, iterationIndex) => {
      return dataset.map((dataset) => {
        const timestamp = dataset[0] + duration*iterationIndex;
        return [
          timestamp,
          dataset[1]
        ];
      });
    };

    const datasetDurationSec = datasetDuration/1000;
    let twoHourDataset = [];
    let i = 0;
    while(i++ < count) {
      const ds = getDataset(Datasets[key], datasetDurationSec, i);
      twoHourDataset = twoHourDataset.concat(ds);
    }
    datasets[key] = twoHourDataset;
    return datasets;
  }, {});
};

export default getTwoHourDatasets;
