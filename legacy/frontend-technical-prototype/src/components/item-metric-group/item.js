import React from  'react';

import {
  MetricGraph,
  MetricView,
  MiniMetricMeta,
  MiniMetricTitle/*,
  MiniMetricSubtitle*/
} from '@ui/components/metric';

const MetricItem = ({
  uuid,
  data,
  type
}) => {
  const values = data.values;
  const median = values[values.length-1].median;
  const percentage = Math.round((median-data.min)*100/(data.max-data.min));
  // TODO this value needs to be normalised
  // also needs a measurement
  return (
    <MetricView borderless mini>
      <MiniMetricMeta>
        <MiniMetricTitle>{`${type.name}: ${percentage}%`}</MiniMetricTitle>
        {/*<MiniMetricSubtitle>(1280/3000 MB)</MiniMetricSubtitle>*/}
      </MiniMetricMeta>
      <MetricGraph
        data={data}
        width={160}
        height={72}
      />
    </MetricView>
  );
};

MetricItem.propTypes = {
  uuid: React.PropTypes.string,
  data: React.PropTypes.data,
  type: React.PropTypes.object
};

export default MetricItem;
