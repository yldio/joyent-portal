import React from 'react';
import is from 'styled-is';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import remcalc from 'remcalc';

import { H4 } from '../text/headings';
import P from '../text/p';
import { Close } from '../icons';

const Container = styled.div`
  display: flex;
  position: relative;
  background-color: ${props => props.theme.white};
  box-shadow: ${props => props.theme.shadows.bottomShadow};
  border: ${remcalc(1)} solid ${props => props.theme.grey};
  border-radius: ${remcalc(3)};
  width: 100%;
`;

const Color = styled.div`
  border-radius: ${remcalc(3)} 0 0 ${remcalc(3)};

  margin: ${remcalc(-1)} 0 ${remcalc(-1)} ${remcalc(-1)};
  min-width: ${remcalc(12)};

  ${is('success')`
    background-color: ${props => props.theme.green};
  `};

  ${is('error')`
    background-color: ${props => props.theme.red};
  `};

  ${is('warning')`
    background-color: ${props => props.theme.orange};
  `};
`;

const Outlet = styled.div`
  /* trick prettier */
  padding: ${remcalc(18)} ${remcalc(18)};
`;

const Text = P.extend`
  line-height: ${remcalc(14)};
  font-size: ${remcalc(13)};
`;

const CloseIcons = Close.extend`
  position: absolute;
  top: ${remcalc(23)};
  right: ${remcalc(18)};
  cursor: pointer;
`;

export const Message = ({ onCloseClick, children, ...type }) => (
  <Container>
    <Color {...type} />
    <Outlet>{children}</Outlet>
    {onCloseClick ? <CloseIcons onClick={onCloseClick} /> : null}
  </Container>
);

export const Title = ({ children }) => <H4 noMargin>{children}</H4>;

export const Description = ({ children }) => <Text>{children}</Text>;

Message.propTypes = {
  /**
   * Function to call when the close button is clicked
   */
  onCloseClick: PropTypes.func,
  /**
   * Is it an error message ?
   */
  error: PropTypes.bool,
  /**
   * Is it an warning message ?
   */
  warning: PropTypes.bool,
  /**
   * Is it an success message ?
   */
  success: PropTypes.bool
};

Message.defaultProps = {
  error: false,
  warning: false,
  success: true
};

export default Message;
