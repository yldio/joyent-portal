import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MetricGraph } from 'joyent-ui-toolkit';

const ServiceMetrics = ({
  metricsData,
  graphDurationSeconds
}) => {

  // metricsData should prob be an array rather than an object
  const metricGraphs = Object.keys(metricsData).map((key) => (
    // should also have a header, w metric name and number of instances (omit everything else from design for copilot)
    <MetricGraph
      key={key}
      metricsData={metricsData[key]}
      width={954}
      height={292}
      graphDurationSeconds={graphDurationSeconds}
    />
  ))
  // This needs layout!!!
  return (
    <div>
      {metricGraphs}
    </div>
  )
}

ServiceMetrics.propTypes = {
  // metricsData should prob be an array rather than an object
  metricsData: PropTypes.object.isRequired,
  graphDurationSeconds: PropTypes.number.isRequired
}

export default ServiceMetrics;
