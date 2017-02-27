import React from 'react';
import styled from 'styled-components';
import { Broadcast, Subscriber } from 'react-broadcast';
import { remcalc } from '../../shared/functions';
import { Baseline } from '../../shared/composers';
import { colors } from '../../shared/constants';
import Item from './item';

const StyledItem = styled(Item)`
  position: absolute;

  background-color: ${colors.base.primary};
  border: solid ${remcalc(1)} ${colors.base.primaryDesaturatedActive};
  box-shadow: none;

  width: calc(100% + ${remcalc(2)});
  margin: 0;

  top: ${remcalc(-1)};
  left: ${remcalc(-1)};
  right: ${remcalc(-1)};
`;

const Header = ({
  children,
  ...props
}) => {
  const render = (value) => {
    const newValue = {
      ...value,
      fromHeader: true
    };

    return (
      <Broadcast channel='list-item' value={newValue}>
        <StyledItem
          collapsed
          name='list-item-header'
          headed
          {...props}
        >
          {children}
        </StyledItem>
      </Broadcast>
    );
  };

  return (
    <Subscriber channel='list-item'>
      {render}
    </Subscriber>
  );
};

Header.propTypes = {
  children: React.PropTypes.node
};

export default Baseline(
  Header
);
