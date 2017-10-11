import React from 'react';
import { Subscriber } from 'joy-react-broadcast';
import is from 'styled-is';
import remcalc from 'remcalc';

import Label from '../label';

const StyledLabel = Label.extend`
  margin-right: ${remcalc(12)};
  font-weight: bold;
  ${is('disabled')`
    color:  ${props => props.theme.grey};
  `};
`;

export default props => {
  const render = value => {
    const { id = '' } = value || {};
    return <StyledLabel {...props} htmlFor={id} />;
  };

  return <Subscriber channel="input-group">{render}</Subscriber>;
};
