import PropTypes from 'prop-types';
import styled from 'styled-components';
import remcalc from 'remcalc';
import is from 'styled-is';

import BaseLabel from '../label';

export const Label = BaseLabel.extend`
  display: inline-block;
  margin-left: 0;

  ${is('light')`
    color: ${props => props.theme.white};
  `};

  ${is('disabled')`
    color: ${props => props.theme.text};
  `};

  ${is('left')`
    margin-left: ${remcalc(12)};
  `};
`;

Label.propTypes = {
  light: PropTypes.bool,
  disabled: PropTypes.bool,
  left: PropTypes.bool
};

export const IconContainer = styled.div`
  display: flex;

  > svg {
    ${is('light')`
      fill: ${props => props.theme.white};
    `};

    ${is('disabled')`
      fill: ${props => props.theme.text};
    `};
  }
`;

IconContainer.propTypes = {
  light: PropTypes.bool,
  disabled: PropTypes.bool
};

export default styled.div`
  height: 100%;
  float: right;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-direction: row;
`;
