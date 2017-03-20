import React from 'react';
import styled from 'styled-components';
import { unitcalc } from '../../shared/functions';
import { P } from '../base-elements';

const StyledContainer = styled.div`
  display: inline-block;
  margin: 0 ${unitcalc(2)};
`;

const StyledIcon = styled.div`
  display: inline-block;
  margin-right: ${unitcalc(1)};
  vertical-align: ${props =>
    props.iconPosition ?
      props.iconPosition : 'text-top'};
`;

const StyledP = styled(P)`
  display: inline-block;
  margin: 0;
`;

const Info = ({
  icon,
  iconPosition,
  label
}) => (
  <StyledContainer>
    <StyledIcon iconPosition={iconPosition}>
      {icon}
    </StyledIcon>
    <StyledP>{label}</StyledP>
  </StyledContainer>
);

Info.propTypes = {
  icon: React.PropTypes.node,
  iconPosition: React.PropTypes.string,
  label: React.PropTypes.string
};

export default Info;
