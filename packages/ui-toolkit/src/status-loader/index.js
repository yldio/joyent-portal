import React from 'react';
import styled from 'styled-components';
import is, { isNot } from 'styled-is';

import Widget from './widget';
import P from '../text/p';
import remcalc from 'remcalc';

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

export default ({ msg, row, inline }) => (
  <Container row={row} inline={inline}>
    <Loader />
    <Msg>{msg || 'Loading...'}</Msg>
  </Container>
);
