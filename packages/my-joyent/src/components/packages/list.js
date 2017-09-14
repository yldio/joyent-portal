import React from 'react';
import remcalc from 'remcalc';
import styled from 'styled-components';

import Package from '@components/package';

const ListStyled = styled.ul`
  display: flex;
  width: 100%;
  list-style: none;
  padding: 0;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: ${remcalc(36)};
`;
const Packages = ({ packages }) => (
  <ListStyled>
    {packages.map(pack => (
      <li key={pack.name}>
          <Package pack={pack} />
      </li>
    ))}
  </ListStyled>
);

export default Packages;
