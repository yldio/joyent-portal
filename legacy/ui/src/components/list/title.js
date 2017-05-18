import { Subscriber } from 'react-broadcast';
import isString from 'lodash.isstring';
import { Baseline, typography } from '../../shared/composers';
import { colors } from '../../shared/constants';
import { remcalc, is } from '../../shared/functions';
import styled from 'styled-components';
import React from 'react';

const Container = styled.div`
  font-size: ${remcalc(15)};
  line-height: 1.5;
  color: ${colors.base.secondary};

  ${typography.medium}

  display: flex;
  flex-direction: row;
  justify-content: flex-start;

  flex-grow: 2;
  width: 100%;

  padding: ${remcalc(12)} ${remcalc(18)} 0 ${remcalc(18)};

  ${is('fromHeader')`
    color: ${colors.base.white};
  `};

  ${is('collapsed')`
    flex-grow: 0;
    flex-direction: column;
    width: auto;
    justify-content: center;
    padding: 0 ${remcalc(18)};
  `};
`;

const Span = styled.span`
  display: inline-block;
  flex-direction: column;
  justify-content: center;

  ${is('collapsed')`
    display: flex;
  `};
`;

const Title = ({
  children,
  ...props
}) => {
  const _children = !isString(children) ? children : (
    <Span>{children}</Span>
  );

  const render = ({
    collapsed = false,
    fromHeader = false
  }) => (
    <Container
      collapsed={collapsed}
      fromHeader={fromHeader}
      name='list-item-title'
      xs={collapsed ? 6 : 12}
      {...props}
    >
      {_children}
    </Container>
  );

  return (
    <Subscriber channel='list-item'>
      {render}
    </Subscriber>
  );
};

Title.propTypes = {
  children: React.PropTypes.node,
  collapsed: React.PropTypes.bool,
  fromHeader: React.PropTypes.bool
};

export default Baseline(
  Title
);
