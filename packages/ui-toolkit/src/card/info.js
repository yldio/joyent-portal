import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import remcalc from 'remcalc';
import Label from '../label';

const StyledLabel = Label.extend`
  display: inline-block;
  ${props => (props.color === 'light' ? `color: ${props.theme.white};` : '')};
  ${props => (props.color === 'disabled' ? `color: ${props.theme.text};` : '')};
  margin-left: ${props => (props.iconPosition === 'left' ? remcalc(12) : 0)};
`;

const StyledIconContainer = styled.div`
  display: flex;
  > svg {
    ${props => (props.color === 'light' ? `fill: ${props.theme.white};` : '')};
    ${props =>
      props.color === 'disabled' ? `fill: ${props.theme.text};` : ''};
  }
`;

const CardInfoContainer = styled.div`
  height: 100%;
  float: right;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-direction: row;
`;

const CardInfo = ({
  label,
  icon,
  iconPosition = 'left',
  color = 'light',
  onMouseOver,
  onMouseOut
}) => {
  return (
    <CardInfoContainer onMouseOver={onMouseOver} onMouseOut={onMouseOver}>
      <StyledIconContainer iconPosition={iconPosition} color={color}>
        {icon}
      </StyledIconContainer>
      <StyledLabel iconPosition={iconPosition} color={color}>
        {label}
      </StyledLabel>
    </CardInfoContainer>
  );
};

CardInfo.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  iconPosition: PropTypes.string,
  color: PropTypes.oneOf(['dark', 'light', 'disabled'])
};

export default CardInfo;
