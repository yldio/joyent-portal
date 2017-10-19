import React from 'react';
import styled from 'styled-components';
import is, { isNot } from 'styled-is';
import remcalc from 'remcalc';

import Widget from './widget';
import P from '../text/p';
import Baseline from '../baseline';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-content: center;
  align-items: center;
  min-height: ${remcalc(20)};

  ${isNot('inline')`
    flex: 1 0 auto;
  `};

  ${is('row')`
    flex-direction: row;
  `};

  ${is('row', 'inline')`
    margin-left: ${remcalc(44)};
  `};
`;

const Loader = styled(Widget)`
  flex: 0 0 auto;
  align-self: stretch;
`;

const Msg = P.extend`
  flex: 0 0 auto;
  align-self: stretch;
  text-align: center;
  margin-bottom: 0;
  margin-left: ${remcalc(6)};
`;

const StatusLoader = ({ msg, row, inline, small, ...rest }) => (
  <Container row={row} inline={inline} {...rest}>
    <Loader />
    {!small && <Msg>{msg || 'Loading...'}</Msg>}
  </Container>
);

export default Baseline(StatusLoader);
