const React = require('react');
const Styled = require('styled-components');
const constants = require('../../shared/constants');
const fns = require('../../shared/functions');
const Button = require('../button');

const {
  boxes,
  colors
} = constants;

const {
  remcalc
} = fns;

const {
  default: styled
} = Styled;

const padding = remcalc(24);

const AddMetricContainer = styled.div`
  position: relative;
  width: ${300}px;
  height: ${247}px;
  padding: ${padding};
  box-shadow: ${boxes.bottomShaddow};
  border: 1px solid ${colors.borderSecondary};
  background-color: ${colors.brandSecondary};
`;
// WHy is the font not sans?
const Title = styled.h4`
  margin-bottom: 0;
  color: ${colors.semibold};
`;

const Description = styled.p`
  margin: 0;
  color: ${colors.regular};
`;

// I don't want to have important rules all over the place...
const Link = styled.a`
  text-decoration: underline !important;
`;

const ButtonContainer = styled(Button)`
  position: absolute;
  left: ${padding};
  bottom: ${padding};
`;

const AddMetric = ({
  title,
  description,
  link,
  linkLabel,
  added,
  addLabel,
  addedLabel,
  onAddToggle
}) => {
  return (
    <AddMetricContainer>
      <Title>{title}</Title>
      <Description>{description}</Description>
      <Link href={link}>{linkLabel}</Link>
      { added ?
        <ButtonContainer disabled>{addedLabel}</ButtonContainer> :
        <ButtonContainer secondary>{addLabel}</ButtonContainer> }
    </AddMetricContainer>
  );
};

AddMetric.propTypes = {
  addLabel: React.PropTypes.string.isRequired,
  added: React.PropTypes.bool.isRequired,
  addedLabel: React.PropTypes.string.isRequired,
  description: React.PropTypes.string.isRequired,
  link: React.PropTypes.string.isRequired,
  linkLabel: React.PropTypes.string.isRequired,
  onAddToggle: React.PropTypes.func.isRequired,
  title: React.PropTypes.string.isRequired,
};

module.exports = AddMetric;
