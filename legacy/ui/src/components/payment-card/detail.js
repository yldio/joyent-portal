import { Baseline } from '../../shared/composers';
import React from 'react';
import styled from 'styled-components';

const Container = styled.p`
  margin: 0;
  line-height: 1.2;
`;

const Detail = ({
  children,
  ...props
}) => (
  <Container {...props}>
    {children}
  </Container>
);

Detail.propTypes = {
  children: React.PropTypes.node
};

export default Baseline(
  Detail
);
