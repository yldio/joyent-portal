import React from 'react';
import styled, { withTheme } from 'styled-components';
import remcalc from 'remcalc';
import is from 'styled-is';

import { Close } from '../icons';

const CloseIcon = styled(Close)`
  margin-left: ${remcalc(12)} ${is('onClick')`
    cursor: pointer;
  `};
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

  ${is('fill')`
    background: ${props => props.fill};
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
  ({
    theme,
    children,
    active,
    onRemoveClick,
    fill = null,
    iconFill = null,
    ...rest
  }) => (
    <Tag fill={fill} active={active} {...rest}>
      {children}
      {onRemoveClick ? (
        <CloseIcon
          fill={iconFill ? iconFill : active ? theme.primaryActive : theme.text}
          disabled
          onClick={onRemoveClick}
        />
      ) : null}
    </Tag>
  )
);
