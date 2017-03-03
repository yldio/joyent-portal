import { remcalc } from '../../shared/functions';
import { colors } from '../../shared/constants';
import { baseBox, pseudoEl, Baseline } from '../../shared/composers';
import { ButtonIcon } from '../button';
import CloseIcon from '../icons/close';
import styled from 'styled-components';
import React from 'react';

const StyledNotification = styled.div`
  display: inline-block;
  min-height: 100%;
  position: relative;
  width: 100%;

  ${baseBox(0)}

  &::before {
    background-color: ${props => colors[props.type] || colors.brandPrimary}
    width: ${remcalc(108)};
    height: 100%;

    ${pseudoEl()}
  }
`;

const StyledContent = styled.div`
  float: left;
  padding: ${remcalc(18)} 20% ${remcalc(18)} ${remcalc(18)};
  margin-left: ${remcalc(108)};
  width: 100%;
`;

const Notificaton = ({
  close,
  children,
  ...props
}) => {
  const renderClose = !close ? null : (
    <ButtonIcon>
      <CloseIcon onClick={close} />
    </ButtonIcon>
  );

  return (
    <StyledNotification {...props}>
      {renderClose}
      <StyledContent>
        {children}
      </StyledContent>
    </StyledNotification>
  );
};

Notificaton.propTypes = {
  children: React.PropTypes.object,
  close: React.PropTypes.func,
  type: React.PropTypes.string
};

export default Baseline(
  Notificaton
);
