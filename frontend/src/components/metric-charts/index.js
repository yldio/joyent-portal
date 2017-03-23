import React from 'react';
import moment from 'moment';
import { FormattedMessage } from 'react-intl';
import PropTypes from '@root/prop-types';

import {
  MetricGraph,
  MetricCloseButton,
  MetricHeader,
  MetricSelect,
  MetricSettingsButton,
  MetricTitle,
  MetricView
} from '@ui/components/metric';

const MetricCharts = ({
  datasets,
  durations = [
    360,
    720,
    1440,
    2880
  ],
  onDurationChange,
  onSettingsClick,
  onRemoveMetric = () => {}
}) => {
  const optionList = durations.map((duration) => (
    <option key={String(duration)} value={duration}>
      {moment.duration(duration, 'minutes').humanize()}
    </option>
  ));

  const metricList = datasets.map(({
    data,
    duration = durations[0],
    type,
    uuid
  }, index) => {
    const handleSelectChange = (evt) => {};
      // onDurationChange(Number(evt.target.value), uuid);
    const handleSettingsClick = (evt) => {};
    const handleRemoveMetric = (evt) => {};

    return (
      <MetricView key={type.id}>
        <MetricHeader>
          <MetricTitle>
            {type.name}
            {/*<FormattedMessage id={`metrics-section.${type.id}.title`} />*/}
          </MetricTitle>
          <MetricSelect onChange={handleSelectChange} value={String(duration)}>
            {optionList}
          </MetricSelect>
          <MetricSettingsButton onClick={handleSettingsClick}>
            <FormattedMessage id={'metrics-section.metric.settings-label'} />
          </MetricSettingsButton>
          <MetricCloseButton onClick={handleRemoveMetric} />
        </MetricHeader>
        <MetricGraph
          axes
          data={data}
          duration={duration}
          yMax={type.max}
          yMeasurement={type.measurement}
          yMin={type.min}
          width={940}
          height={262}
        />
      </MetricView>
    );
  });

  return (
    <div>
      {metricList}
    </div>
  );
};

MetricCharts.propTypes = {
  datasets: React.PropTypes.arrayOf(PropTypes.dataset),
  durations: React.PropTypes.arrayOf(React.PropTypes.number),
  onDurationChange: React.PropTypes.func.isRequired,
  onRemoveMetric: React.PropTypes.func.isRequired,
  onSettingsClick: React.PropTypes.func.isRequired
};

export default MetricCharts;
