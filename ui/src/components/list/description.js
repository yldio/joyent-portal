import { Subscriber } from 'react-broadcast';
import { Baseline } from '../../shared/composers';
import { remcalc, is, isNot } from '../../shared/functions';
import styled from 'styled-components';
import Title from './title';
import React from 'react';

const StyledTitle = styled(Title)`
  font-weight: normal;
  flex-grow: 2;

  ${isNot('collapsed')`
    position: absolute;
    bottom: 0;
    padding-bottom: ${remcalc(12)};
    padding-top: 0;
  `};
`;

const InnerDescription = styled.div`
  justify-content: flex-start;

  ${is('collapsed')`
    justify-content: flex-end;
    margin-left: auto;
  `};
`;

const Description = ({
  children,
  ...props
}) => {
  const render = ({
    collapsed = false
  }) => (
    <StyledTitle
      collapsed={collapsed}
      name='list-item-description'
      xs={collapsed ? 6 : 12}
    >
      <InnerDescription collapsed={collapsed}>
        {children}
      </InnerDescription>
    </StyledTitle>
  );

  return (
    <Subscriber channel='list-item'>
      {render}
    </Subscriber>
  );
};

Description.propTypes = {
  children: React.PropTypes.node,
  collapsed: React.PropTypes.bool
};

export default Baseline(
  Description
);
