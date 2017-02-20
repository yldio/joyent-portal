import { Baseline } from '../../shared/composers';
import { remcalc, is } from '../../shared/functions';
import styled from 'styled-components';
import Title from './title';
import React from 'react';

const xs = (props) => props.collapsed
  ? 6
  : 12;

const StyledTitle = styled(Title)`
  ${is('collapsed')`
    position: absolute;
    bottom: 0;
    padding-bottom: ${remcalc(12)};
    padding-top: 0;
  `};

  font-weight: normal;
  flex-grow: 2;
`;

const InnerDescription = styled.div`
  justify-content: flex-start;

  ${is('collapsed')`
    margin-left: auto;
    justify-content: flex-end;
  `};
`;

const Description = ({
  children,
  collapsed,
  ...props
}) => (
  <StyledTitle
    {...props}
    name='list-item-description'
    xs={xs(props)}
  >
    <InnerDescription collapsed={collapsed}>
      {children}
    </InnerDescription>
  </StyledTitle>
);

Description.propTypes = {
  children: React.PropTypes.node,
  collapsed: React.PropTypes.bool
};

export default Baseline(
  Description
);
