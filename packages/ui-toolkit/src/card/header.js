import React from 'react';
import { Broadcast, Subscriber } from 'react-broadcast';
import remcalc from 'remcalc';
import PropTypes from 'prop-types';
import Baseline from '../baseline';
import Card from './card';

const StyledCard = Card.extend`
  position: absolute;
  flex-direction: row;

  background-color: ${props => props.theme.primary};
  border: solid ${remcalc(1)} ${props => props.theme.primaryDesaturatedActive};
  box-shadow: none;

  width: calc(100% + ${remcalc(2)});
  margin: ${remcalc(-1)} ${remcalc(-1)} 0 ${remcalc(-1)};
`;

const Header = ({ children, ...rest }) => {
  const render = value => {
    const newValue = {
      ...value,
      fromHeader: true
    };

    return (
      <Broadcast channel="card" value={newValue}>
        <StyledCard name="card-header" collapsed headed {...rest}>
          {children}
        </StyledCard>
      </Broadcast>
    );
  };

  return (
    <Subscriber channel="card">
      {render}
    </Subscriber>
  );
};

Header.propTypes = {
  children: PropTypes.node
};

export default Baseline(Header);
