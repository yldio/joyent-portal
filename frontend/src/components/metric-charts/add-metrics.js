import React from 'react';
import PropTypes from '@root/prop-types';
import { FormattedMessage } from 'react-intl';

import {
  AddMetricButton,
  AddMetricDescription,
  AddMetricLink,
  AddMetricTile,
  AddMetricTitle
} from '@ui/components/add-metric';

const AddMetrics = ({
  datasets,
  metricTypes,
  onAddMetric
}) => {
  const added = (metric) => Boolean(datasets.filter((dataset) =>
    dataset.type.uuid === metric
  ).length);

  const addButton = (metric) => (
    <AddMetricButton metric={metric} onClick={onAddMetric}>
      <FormattedMessage id={'metrics.add.add-label'} onClick={onAddMetric} />
    </AddMetricButton>
  );

  const addedButton = (
    <AddMetricButton disabled>
      <FormattedMessage id={'metrics.add.added-label'} />
    </AddMetricButton>
  );

  const metricList = metricTypes.map((metric) => (
    <AddMetricTile key={metric.id}>
      <AddMetricTitle>
        <FormattedMessage id={`metrics.${metric.id}.title`} />
      </AddMetricTitle>
      <AddMetricDescription>
        <FormattedMessage id={`metrics.${metric.id}.description`} />
      </AddMetricDescription>
      <AddMetricLink href='http://somelink.com'>
        <FormattedMessage id={'metrics.add.link-label'} />
      </AddMetricLink>
      { added(metric.uuid) ? addedButton : addButton(metric.uuid) }
    </AddMetricTile>
  ));

  return (
    <div>
      {metricList}
    </div>
  );
};

AddMetrics.propTypes = {
  datasets: React.PropTypes.arrayOf(PropTypes.dataset),
  metricTypes: React.PropTypes.arrayOf(PropTypes.metric),
  onAddMetric: React.PropTypes.func.isRequired
};

export default AddMetrics;
