import React from 'react';
import remcalc from 'remcalc';
import styled from 'styled-components';
import { Col } from 'react-styled-flexboxgrid';

import Package from '@components/package';

const ListStyled = styled.ul`
  display: flex;
  min-width: 100%;
  list-style: none;
  padding: 0;
  flex-wrap: wrap;
  margin-top: ${remcalc(36)};
  margin-right: -0.5rem;
  margin-left: -0.5rem;
`;
const Packages = ({ packages }) => (
  <ListStyled>
    {packages.length > 0 ? (
      packages.map(pack => (
        <Col xs={12} sm={6} md={4} lg={3} key={pack.name}>
          <Package pack={pack} />
        </Col>
      ))
    ) : (
      'There are no packages that meet your criteria'
    )}
  </ListStyled>
);

export default Packages;
