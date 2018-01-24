import React from 'react';
import styled, { withTheme } from 'styled-components';
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
  padding: ${remcalc(5)} ${remcalc(12)};
  display: flex;
  align-items: center;
  flex-grow: 1;

  ${is('active')`
      border: ${remcalc(1)} solid ${props => props.theme.primaryActive};
      background: rgba(59, 70, 204, .1)
  `};

  ${is('onClick')`
    cursor: pointer;
  `};
`;

export default withTheme(
  ({ theme, children, active, onRemoveClick, ...rest }) => (
    <Container>
      <Tag active={active} {...rest}>
        {children}
        {onRemoveClick ? (
          <CloseIcon
            fill={active ? theme.primaryActive : theme.text}
            disabled
            onClick={onRemoveClick}
          />
        ) : null}
      </Tag>
    </Container>
  )
);
