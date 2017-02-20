import isString from 'lodash.isstring';
import { Baseline } from '../../shared/composers';
import { colors } from '../../shared/constants';
import { remcalc, is } from '../../shared/functions';
import styled from 'styled-components';
import React from 'react';

const xs = (props) => props.collapsed
  ? 6
  : 12;

const Container = styled.div`
  font-size: ${remcalc(16)};
  font-weight: 600;
  line-height: 1.5;
  color: ${colors.base.secondary};

  display: flex;
  flex-direction: row;
  justify-content: flex-start;

  flex-grow: 2;
  width: 100%;

  padding: ${remcalc(12)} ${remcalc(18)} 0 ${remcalc(18)};

  ${is('collapsed')`
    flex-grow: 0;
    flex-direction: column;
    width: auto;
    justify-content: center;
    padding: 0 ${remcalc(18)};
  `};

  ${is('fromHeader')`
    color: ${colors.base.primary};
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
  collapsed,
  ...props
}) => {
  const _children = !isString(children) ? children : (
    <Span>{children}</Span>
  );

  return (
    <Container
      collapsed={collapsed}
      name='list-item-title'
      xs={xs({
        collapsed 
      })}
      {...props}
    >
      {_children}
    </Container>
  );
};

Title.propTypes = {
  children: React.PropTypes.node,
  collapsed: React.PropTypes.bool
};

export default Baseline(
  Title
);
