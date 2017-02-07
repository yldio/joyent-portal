const React = require('react');
const Toggle = require('@ui/components/toggle');

const fns = require('@ui/shared/functions');

const Styled = require('styled-components');

const {
  remcalc,
} = fns;

const {
  default: styled,
} = Styled;

const StyledWrapper = styled.div`
  margin-top: ${remcalc(9)};
  margin-bottom: ${remcalc(36)};
`;

const StyledSpan = styled.span`
  margin-right: ${remcalc(6)};
`;

const ServiceToggle = () => {

  return (
    <StyledWrapper>
      <StyledSpan>View</StyledSpan>
      <Toggle />
    </StyledWrapper>
  );
};

module.exports = ServiceToggle;