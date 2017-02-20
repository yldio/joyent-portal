import styled from 'styled-components';
import { Baseline } from '../../shared/composers';
import { remcalc, is } from '../../shared/functions';
import Title from './title';
import React from 'react';

const Span = styled.span`
  display: inline-block;
  flex-direction: column;

  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  font-size: ${remcalc(14)};

  justify-content: flex-end;

  ${is('collapsed')`
    display: flex;
  `};
`;

const StyledTitle = styled(Title)`
  display: inline-block;
  padding: 0 ${remcalc(18)};

  ${is('collapsed')`
    display: flex;
    padding: 0;
  `};
`;

const Subtitle = ({
  children,
  fromHeader,
  ...props
}) => (
  <StyledTitle name='list-item-subtitle' {...props}>
    <Span fromHeader={fromHeader}>
      {children}
    </Span>
  </StyledTitle>
);

Subtitle.propTypes = {
  children: React.PropTypes.node,
  fromHeader: React.PropTypes.bool
};

export default Baseline(
  Subtitle
);
