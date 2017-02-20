import React from 'react';
import styled from 'styled-components';
import { remcalc } from '../../shared/functions';
import { Baseline } from '../../shared/composers';
import { colors } from '../../shared/constants';
import Item from './item';

const StyledItem = styled(Item)`
  position: absolute;

  background-color: #3B4AAF;

  border: solid ${remcalc(1)} #2D3884;
  box-shadow: none;

  width: calc(100% + ${remcalc(2)});
  margin: 0;

  top: ${remcalc(-1)};
  left: ${remcalc(-1)};
  right: ${remcalc(-1)};

  & [name="list-item-subtitle"],
  & [name="list-item-title"] {
    color: ${colors.base.white};
  }
`;

const addFromHeader = (children) => React.Children.map(children, (c) => {
  return React.cloneElement(c, {
    ...c.props,
    fromHeader: true
  });
});

const Header = (props) => (
  <StyledItem
    collapsed
    headed
    name='list-item-header'
  >
    {addFromHeader(props.children)}
  </StyledItem>
);

Header.propTypes = {
  children: React.PropTypes.node
};

export default Baseline(
  Header
);
