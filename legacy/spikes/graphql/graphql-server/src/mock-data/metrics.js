import normalMetricDataJson from './datasets/dataset-normal.json';
import leakMetricDataJson from './datasets/dataset-leak.json';

const normaliseMetricDataset = (metricDataset) => {
  return Object.keys(metricDataset).reduce((dataset, type) => {
    dataset[type] = metricDataset[type].map((ds) => ({
      timestamp: ds[0],
      value: ds[1]
    }))
    return dataset;
  }, {});
}

const normalMetricData = normaliseMetricDataset(normalMetricDataJson);
const leakMetricData = normaliseMetricDataset(leakMetricDataJson);

export {
  normalMetricData,
  leakMetricData
}
