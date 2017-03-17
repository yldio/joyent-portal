import React from  'react';
import styled from  'styled-components';

import Column from  '@ui/components/column';
import { ListItemOutlet } from  '@ui/components/list';
import PropTypes from  '@root/prop-types';
import Row from  '@ui/components/row';
import MetricItem from './item';

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

const ItemMetricGroup = ({
  datasets = [],
  ...props
}) => {
  const _datasets = datasets.map((metric, i) => (
    <Column key={i} xs={12/datasets.length}>
      <MetricItem
        {...metric}
      />
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

ItemMetricGroup.propTypes = {
  datasets: React.PropTypes.arrayOf(PropTypes.dataset)
};

export default ItemMetricGroup;
