import React from  'react';

import {
  MetricGraph,
  MetricView,
  MiniMetricMeta,
  MiniMetricTitle,
  MiniMetricSubtitle
} from '@ui/components/metric';

const MetricItem = ({
  uuid,
  data
}) => (
  <MetricView borderless mini>
    <MiniMetricMeta>
      <MiniMetricTitle>Memory: 54%</MiniMetricTitle>
      <MiniMetricSubtitle>(1280/3000 MB)</MiniMetricSubtitle>
    </MiniMetricMeta>
    <MetricGraph
      data={data}
      width={160}
      height={72}
    />
  </MetricView>
);

MetricItem.propTypes = {
  uuid: React.PropTypes.string,
  data: React.PropTypes.data
};

export default MetricItem;
