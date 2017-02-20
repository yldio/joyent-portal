import styled from 'styled-components';
import { Baseline } from '../../shared/composers';
import transferProps from '../../shared/transfer-props';
import { remcalc, is } from '../../shared/functions';
import Row from '../row';
import React from 'react';

const StyledView = styled(Row)`
  flex: 1;
  margin: 0;
  height: auto;
  padding-top: 0;

  ${is('headed')`
    padding-top: ${remcalc(47)};
  `};

  ${is('fromHeader')`
    padding-top: 0;
  `};

  ${is('collapsed')`
    height: ${remcalc(48)};
  `};
`;

const View = (props) => {
  const hide = props.headed &&
              !props.fromHeader &&
               props.collapsed;

  return hide ? null : (
    <StyledView name='list-item-view' {...props}>
      {props.children}
    </StyledView>
  );
};

View.propTypes = {
  children: React.PropTypes.node,
  collapsed: React.PropTypes.bool,
  fromHeader: React.PropTypes.bool,
  headed: React.PropTypes.bool
};

const BaselineView = Baseline(
  View
);

export default transferProps([
  'collapsed',
  'headed',
  'fromHeader'
], BaselineView);

export const raw = BaselineView;
