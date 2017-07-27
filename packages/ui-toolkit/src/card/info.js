import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import remcalc from 'remcalc';
import Label from '../label';

const StyledLabel = Label.extend`
  ${props => (props.color === 'light' ? `color: ${props.theme.white};` : '')};
  ${props => (props.color === 'disabled' ? `color: ${props.theme.grey};` : '')};
  margin-left: ${props => (props.iconPosition === 'left' ? remcalc(24) : 0)};
`;

const StyledIconContainer = styled.div`
  position: absolute;

  > svg {
    ${props => (props.color === 'light' ? `fill: ${props.theme.white};` : '')};
    ${props => (props.color === 'disabled' ? `fill: ${props.theme.grey};` : '')};
  }
`;

const CardInfo = ({ label, icon, iconPosition = 'left', color = 'light' }) => {
  return (
    <div>
      <StyledIconContainer iconPosition={iconPosition} color={color}>
        {icon}
      </StyledIconContainer>
      <StyledLabel iconPosition={iconPosition} color={color}>
        {label}
      </StyledLabel>
    </div>
  );
};

CardInfo.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  iconPosition: PropTypes.string,
  color: PropTypes.oneOf(['dark', 'light', 'disabled'])
};

export default CardInfo;
