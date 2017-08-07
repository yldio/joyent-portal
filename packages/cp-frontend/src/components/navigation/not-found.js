import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import remcalc from 'remcalc';
import { H1, H2, P, Button } from 'joyent-ui-toolkit';
import { LayoutContainer } from '@components/layout';

const StyledContainer = styled.div`
  margin-top: ${remcalc(60)};
`;

const StyledTitle = styled(H1)`
  font-weight: normal;
  font-size: ${remcalc(32)};
`;

const StyledP = styled(P)`
  margin-bottom: ${remcalc(30)};
  max-width: ${remcalc(490)};
`;

const NotFound = ({
  title = 'I have no memory of this place',
  message = 'HTTP 404: We can’t find what you are looking for. Next time, always follow your nose.',
  link = 'Back to dashboard',
  to = '/deployment-groups'
}) => (
  <LayoutContainer>
    <StyledContainer>
      <StyledTitle>{title}</StyledTitle>
      <StyledP>{message}</StyledP>
      <Button to={to}>{link}</Button>
    </StyledContainer>
  </LayoutContainer>
);

NotFound.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  link: PropTypes.string,
  to: PropTypes.string
}

export default NotFound;
