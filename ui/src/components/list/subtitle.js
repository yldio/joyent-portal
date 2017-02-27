import { Subscriber } from 'react-broadcast';
import styled from 'styled-components';
import { Baseline, regular } from '../../shared/composers';
import { remcalc, is } from '../../shared/functions';
import { colors } from '../../shared/constants';
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

  ${is('fromHeader')`
    color: ${colors.base.white};
  `};
`;

const StyledTitle = styled(Title)`
  display: inline-block;
  padding: 0 ${remcalc(18)};

  ${regular};

  ${is('collapsed')`
    display: flex;
    padding: 0;
  `};
`;

const Subtitle = ({
  children,
  ...props
}) => {
  const render = ({
    fromHeader = false,
    collapsed = false
  }) => (
    <StyledTitle
      name='list-item-subtitle'
      fromHeader={fromHeader}
      collapsed={collapsed}
      {...props}
    >
      <Span fromHeader={fromHeader} collapsed={collapsed}>
        {children}
      </Span>
    </StyledTitle>
  );

  return (
    <Subscriber channel='list-item'>
      {render}
    </Subscriber>
  );
};


Subtitle.propTypes = {
  children: React.PropTypes.node,
  collapsed: React.PropTypes.bool,
  fromHeader: React.PropTypes.bool
};

export default Baseline(
  Subtitle
);
