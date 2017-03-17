import React from  'react';

import { MetricGraph, MetricView } from '@ui/components/metric';
import PropTypes from  '@root/prop-types';

const MetricItem = ({
  uuid,
  data
}) => (
  <MetricView borderless mini>
    <MetricGraph data={data} />
  </MetricView>
);

MetricItem.propTypes = {
  uuid: React.PropTypes.string,
  data: PropTypes.data
};

export default MetricItem;
