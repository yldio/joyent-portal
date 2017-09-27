import React from 'react';
import remcalc from 'remcalc';
import styled from 'styled-components';
import is, { isNot } from 'styled-is';

const Dot = styled.span`
  width: ${remcalc(6)};
  height: ${remcalc(6)};
  border-radius: ${remcalc(3)};

  ${is('hasChildren')`
    margin-left: ${remcalc(6)};
  `};

  background-color: ${props => props.theme[props.color]};

  align-self: auto;
  flex: none;
`;

const Icon = styled.span`
  /* trick prettier */
  background-color: none;
`;

const Label = styled.label`
  line-height: 1;
  padding: 0 ${remcalc(18)};
  display: flex;
  flex-direction: row;
  flex: none;

  align-items: center;
  justify-content: center;

  min-width: ${remcalc(100)};
  padding-left: 0;

  ${isNot('hasDot')`
    min-width: ${remcalc(88)};
  `};

  ${isNot('hasChildren')`
    width: ${remcalc(6)};
    min-width: ${remcalc(6)};
  `};
`;

const Span = styled.span`
  align-self: auto;
  flex: 1 1 auto;

  ${is('hasDot')`
    text-align: right;
  `};
`;

export default ({ color, icon, children, width, ...rest }) => {
  const hasIcon = Boolean(icon);
  const hasDot = hasIcon || Boolean(color);

  const hasChildren = Array.isArray(children)
    ? children.length
    : Boolean(children);

  return (
    <Label {...rest} hasDot={hasDot} hasChildren={hasChildren}>
      {children && <Span hasDot={hasDot}>{children}</Span>}
      {icon && <Icon>{icon}</Icon>}
      {color && <Dot color={color} hasChildren={hasChildren} />}
    </Label>
  );
};
