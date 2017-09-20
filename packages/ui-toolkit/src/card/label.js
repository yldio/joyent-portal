import React from 'react';
import remcalc from 'remcalc';
import styled from 'styled-components';
import is, { isNot } from 'styled-is';

const Dot = styled.span`
  width: ${remcalc(6)};
  height: ${remcalc(6)};
  border-radius: ${remcalc(3)};

  ${is('hasChildren')`
    margin-right: ${remcalc(6)};
  `};

  background-color: ${props => props.theme[props.color]};

  align-self: auto;
  flex: none;
`;

const Label = styled.label`
  line-height: 1;
  padding: 0 ${remcalc(18)};
  display: flex;
  flex-direction: row;
  flex: none;

  align-items: center;
  justify-content: center;

  width: ${remcalc(100)};

  ${isNot('hasDot')`
    width: ${remcalc(88)};
  `};

  ${isNot('hasChildren')`
    width: ${remcalc(6)};
  `};
`;

const Span = styled.span`
  align-self: auto;
  flex: 1 1 auto;
`;

export default ({ color, children, ...rest }) => {
  const hasDot = Boolean(color);

  const hasChildren = Array.isArray(children)
    ? children.length
    : Boolean(children);

  return (
    <Label {...rest} hasDot={hasDot} hasChildren={hasChildren}>
      {color && <Dot color={color} hasChildren={hasChildren} />}
      {children && <Span>{children}</Span>}
    </Label>
  );
};
