import Baseline from '../baseline';
// eslint-disable-next-line no-unused-vars
import React from 'react';
import styled from 'styled-components';

import HealthyIcon from './svg/icon_healthy.svg';

const StyledHealthyIcon = styled(HealthyIcon)`
  fill: ${props => !props.healthy || props.healthy === 'HEALTHY'
    ? props.theme.green : props.theme.orange};
`;

export default Baseline(StyledHealthyIcon);
