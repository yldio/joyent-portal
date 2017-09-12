import { Subscriber } from 'react-broadcast';
import styled from 'styled-components';
import Baseline from '../baseline';
import typography from '../typography';
import remcalc from 'remcalc';
import PropTypes from 'prop-types';
import Title from './title';
import React from 'react';

const StyledTitle = Title.extend`
  ${typography.fontFamily};
  ${typography.normal};

  flex-grow: 1;
  flex-basis: ${remcalc(90)};
`;

const Span = styled.span`
  display: inline-block;
  flex-direction: column;

  ${typography.fontFamily};
  ${typography.normal};
  font-size: ${remcalc(13)};
  font-weight: 500;
  text-transform: uppercase;

  color: rgba(73, 73, 73, 0.5);
`;
const Footer = ({ children }) => {
  const render = () => (
    <StyledTitle name="card-footer">
      <Span>{children}</Span>
    </StyledTitle>
  );

  return <Subscriber channel="card">{render}</Subscriber>;
};

Footer.propTypes = {
  children: PropTypes.node
};

export default Baseline(Footer);
