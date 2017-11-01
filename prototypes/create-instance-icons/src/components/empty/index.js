import React from 'react';
import styled from 'styled-components';
import remcalc from 'remcalc';

import { Card, H4, H5 } from 'joyent-ui-toolkit';

import Cloud from '../../assets/cloud.svg';

const CardStyled = styled(Card)`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  display: flex;
  padding: ${remcalc(18)};
`;

const Empty = () => (
  <CardStyled transparent>
    <Cloud width="175" alt="Cloud" />
    <H4>There are no packages that meet your criteria</H4>
    <H5>Please adjust the filters to see some packages here</H5>
  </CardStyled>
);

export default Empty;
