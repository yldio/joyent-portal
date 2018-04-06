import React from 'react';
import styled from 'styled-components';
import { Row } from 'joyent-react-styled-flexboxgrid';
import is from 'styled-is';
import remcalc from 'remcalc';

const HorizontalDivider = styled(Row)`
  height: 1px;
  background-color: ${props => props.theme.grey};
  height: ${props => props.height};

  ${is('transparent')`
    background-color: transparent;
  `};

  ${is('vertical')`
    transform: rotate(90deg);
  `};

  ${is('error')`
    background-color: ${props => props.theme.red};
  `};

  ${is('noMargin')`
    margin-left: 0;
    margin-right: 0;
  `};
`;

const VerticalDivider = styled.div`
  width: ${remcalc(1)};
  background: ${props => props.theme.grey};
  height: ${remcalc(24)};
  display: flex;
  align-self: flex-end;
  margin: 0 ${remcalc(12)};
`;

export default ({ vertical, ...props }) =>
  vertical ? <VerticalDivider {...props} /> : <HorizontalDivider {...props} />;
