import React from 'react';
import { Subscriber } from 'joy-react-broadcast';
import is from 'styled-is';
import remcalc from 'remcalc';

import Label from '../label';

const StyledLabel = Label.extend`
  margin-right: ${remcalc(12)};
  font-weight: ${props => props.theme.font.weight.semibold};
  white-space: pre;
  font-size: ${remcalc(13)};

  ${is('actionable')`
   cursor: pointer;
  `};

  ${is('disabled')`
    color:  ${props => props.theme.grey};
  `};

  ${is('big')`
    font-size: ${remcalc(15)};
  `};

  ${is('normal')`
      font-weight: ${props => props.theme.font.weight.normal};
  `};

    ${is('noMargin')`
      margin: 0;
  `};
`;

export default props => {
  const render = value => {
    const { id = '' } = value || {};
    return <StyledLabel {...props} htmlFor={id} />;
  };

  return <Subscriber channel="input-group">{render}</Subscriber>;
};
