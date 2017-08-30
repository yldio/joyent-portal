import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import remcalc from 'remcalc';

import {
  MetricGraph,
  Card,
  CardView,
  CardTitle,
  CardSubTitle,
  CardDescription,
  CardGroupView,
  CardOptions,
  CardHeader,
  CardInfo,
  Anchor
} from 'joyent-ui-toolkit';

const MetricView = styled(CardView)`
  padding-top: ${remcalc(48)};

  & canvas {
    margin: 0 auto;
  }
`;

const ServiceMetrics = ({ metricsData, graphDurationSeconds }) => {
  // metricsData should prob be an array rather than an object
  // should also have a header, w metric name and number of instances (omit everything else from design for copilot)
  const metricGraphs = Object.keys(metricsData).map(key => (
    <Card key={key} headed active>
      <CardHeader>
        <CardTitle>{key}</CardTitle>
      </CardHeader>
      <MetricView>
        <MetricGraph
          key={key}
          metricsData={metricsData[key]}
          graphDurationSeconds={graphDurationSeconds}
          displayY
          displayX
        />
      </MetricView>
    </Card>
  ));

  // This needs layout!!!
  return <div>{metricGraphs}</div>;
};

ServiceMetrics.propTypes = {
  // metricsData should prob be an array rather than an object
  metricsData: PropTypes.object.isRequired,
  graphDurationSeconds: PropTypes.number.isRequired
};

export default ServiceMetrics;
