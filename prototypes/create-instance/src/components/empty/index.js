import React from 'react';
import styled from 'styled-components';
import remcalc from 'remcalc';

import { Card, CardTitle } from 'joyent-ui-toolkit';

import Cloud from '../../assets/cloud.svg';

const Title = styled(CardTitle)`
  font-weight: 600;
  font-size: ${remcalc(15)};
  color: #808080;
  flex-basis: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 0;
  margin-bottom: ${remcalc(8)};
`;

const SubTitle = styled(Title)`
  /* trick prettier */
  font-weight: normal;
`;

const CardStyled = styled(Card)`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  display: flex;
`;

const StyledCloud = styled(Cloud)`
  /* Prettier Comment */
  margin-bottom: 18px;
`;

const Empty = () => (
  <CardStyled transparent>
    <StyledCloud width="175" alt="Cloud" />
    <Title>There are no packages that meet your criteria</Title>
    <SubTitle>Please adjust the filters to see some packages here</SubTitle>
  </CardStyled>
);

export default Empty;
