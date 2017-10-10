import { Subscriber } from 'joy-react-broadcast';
import Baseline from '../baseline';
import remcalc from 'remcalc';
import is from 'styled-is';
import { Row } from 'react-styled-flexboxgrid';
import PropTypes from 'prop-types';
import React from 'react';

const StyledView = Row.extend`
  flex: 1;
  margin: 0;
  height: auto;
  padding-top: 0;
  min-width: auto;
  flex-direction: row;

  /*${is('headed')`
    padding-top: ${remcalc(47)};
  `};

  ${is('collapsed')`
    height: ${remcalc(47)};
  `};

  ${is('fromHeader')`
    padding-top: 0;
  `};*/
`;

const View = ({ children, ...rest }) => {
  const render = value => {
    const newValue = {
      ...value,
      ...rest
    };

    const hide = newValue.headed && !newValue.fromHeader && newValue.collapsed;

    return hide ? null : (
      <StyledView name="card-view" {...newValue}>
        {children}
      </StyledView>
    );
  };

  return <Subscriber channel="card">{render}</Subscriber>;
};

View.propTypes = {
  children: PropTypes.node,
  collapsed: PropTypes.bool,
  fromHeader: PropTypes.bool,
  headed: PropTypes.bool
};

export default Baseline(View);
