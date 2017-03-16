import React from  'react';
import styled from  'styled-components';

import Column from  '@ui/components/column';
import { ListItemOutlet } from  '@ui/components/list';
import PropTypes from  '@root/prop-types';
import Row from  '@ui/components/row';

import {
  MetricGraph,
  MiniMetricMeta,
  MiniMetricTitle,
  MiniMetricSubtitle,
  MetricView
} from '@ui/components/metric';

const StyledOutlet = styled(ListItemOutlet)`
  padding-left: 0;
  padding-right: 0;
`;

const StyledRow = styled(Row)`
  margin: 0;

  & > div {
    padding-left: 0;
    padding-right: 0;
  }
`;

const MetricsOutlet = ({
  datasets = [],
  ...props
}) => {
  const _datasets = datasets.map((metric, i) => (
    <Column key={i} xs={4}>
      <MetricView mini borderless>
        <MiniMetricMeta>
          <MiniMetricTitle>Memory: 54%</MiniMetricTitle>
          <MiniMetricSubtitle>(1280/3000 MB)</MiniMetricSubtitle>
        </MiniMetricMeta>
        <MetricGraph data={metric.data} />
      </MetricView>
    </Column>
  ));

  return (
    <StyledOutlet {...props}>
      <StyledRow>
        {_datasets}
      </StyledRow>
    </StyledOutlet>
  );
};

MetricsOutlet.propTypes = {
  datasets: React.PropTypes.arrayOf(PropTypes.dataset)
};

export default MetricsOutlet;
