import { colors } from '../../shared/constants';
import { Baseline } from '../../shared/composers';
import styled from 'styled-components';
import React from 'react';

const StyledTableWrapper = styled.section`
  border: solid ${remcalc(1)} ${colors.base.grey}
  font-family: 'LibreFranklin', sans-serif;
	font-style: normal;
`;

const Table = ({
  children,
  ...props
}) => (
  <StyledTableWrapper {...props}>
    {children}
  </StyledTableWrapper>
);

Table.propTypes = {
  children: React.PropTypes.node
};

export default Baseline(
  Table
);
