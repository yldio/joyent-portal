import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ModalHeading, ModalText, Button } from 'joyent-ui-toolkit';

const StyledHeading = styled(ModalHeading)`
  color: ${props => props.theme.red};
`;

const ModalErrorMessage = ({ title, message, onCloseClick }) => (
  <div>
    <StyledHeading>{title}</StyledHeading>
    <ModalText marginBottom="3">{message}</ModalText>
    <Button onClick={onCloseClick} secondary>
      Close{' '}
    </Button>
  </div>
);

ModalErrorMessage.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string.isRequired,
  onCloseClick: PropTypes.func.isRequired
};

export default ModalErrorMessage;
