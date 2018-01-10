import React from 'react';
import styled from 'styled-components';
import remcalc from 'remcalc';
import is from 'styled-is';

import { Close } from '../icons';

const CloseIcon = Close.extend`
  margin-left: ${remcalc(12)};

  ${is('onClick')`
    cursor: pointer;
  `};
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
`;

const Tag = styled.li`
  border: ${remcalc(1)} solid ${props => props.theme.grey};
  box-sizing: border-box;
  border-radius: ${remcalc(3)};
  font-size: ${remcalc(13)};
  line-height: ${remcalc(18)};
  padding: ${remcalc(6)} ${remcalc(12)};
  display: flex;
  align-items: center;
  flex-grow: 1;

  ${is('onClick')`
    cursor: pointer;
  `};
`;

export default ({ children, onRemoveClick, ...rest }) => (
  <Container>
    <Tag {...rest}>
      {children}
      {onRemoveClick ? <CloseIcon disabled onClick={onRemoveClick} /> : null}
    </Tag>
  </Container>
);
