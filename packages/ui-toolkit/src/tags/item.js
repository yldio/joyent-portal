import React from 'react';
import styled, { withTheme } from 'styled-components';
import remcalc from 'remcalc';
import is from 'styled-is';

import { Close } from '../icons';

const CloseIcon = styled(Close)`
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
  border-radius: ${remcalc(2)};
  font-size: ${remcalc(13)};
  line-height: ${remcalc(18)};
  padding: ${remcalc(5)} ${remcalc(12)};
  display: flex;
  flex-grow: 0;
  align-items: center;

  ${is('disabled')`
      background: ${props => props.theme.disabled};
  `};

  ${is('error')`
      border: ${remcalc(1)} solid ${props => props.theme.red};
  `};

  ${is('active')`
      border: ${remcalc(1)} solid ${props => props.theme.primaryActive};
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
