import React from 'react';
import { Subscriber } from 'joy-react-broadcast';
import is from 'styled-is';
import remcalc from 'remcalc';
import styled from 'styled-components';

import Label from '../label';

const StyledLabel = styled(Label)`
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
`;

export default props => {
  const render = value => {
    const { id = '' } = value || {};
    return <StyledLabel {...props} htmlFor={id} />;
  };

  return <Subscriber channel="input-group">{render}</Subscriber>;
};
