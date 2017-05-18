import { Subscriber } from 'react-broadcast';
import styled from 'styled-components';
import { Baseline } from '../../shared/composers';
import { remcalc, is } from '../../shared/functions';
import Row from '../row';
import React from 'react';

const StyledView = styled(Row)`
  flex: 1;
  margin: 0;
  height: auto;
  padding-top: 0;
  min-width: auto;

  ${is('headed')`
    padding-top: ${remcalc(47)};
  `};

  ${is('collapsed')`
    height: ${remcalc(47)};
  `};

  ${is('fromHeader')`
    padding-top: 0;
  `};
`;

const View = ({
  children,
  ...props
}) => {
  const render = (value) => {
    const newValue = {
      ...value,
      ...props
    };

    const hide = (
      newValue.headed &&
      !newValue.fromHeader &&
      newValue.collapsed
    );

    return hide ? null : (
      <StyledView name='list-item-view' {...newValue}>
        {children}
      </StyledView>
    );
  };

  return (
    <Subscriber channel='list-item'>
      {render}
    </Subscriber>
  );
};

View.propTypes = {
  children: React.PropTypes.node,
  collapsed: React.PropTypes.bool,
  fromHeader: React.PropTypes.bool,
  headed: React.PropTypes.bool
};

export default Baseline(
  View
);
