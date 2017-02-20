const React = require('react');
const ReactIntl = require('react-intl');
const Styled = require('styled-components');

const constants = require('@ui/shared/constants');
const fns = require('@ui/shared/functions');
const BaseElements = require('@ui/components/base-elements');
const normalize = require('@root/utils/form/normalize');
const Form = require('@ui/components/form');
const Button = require('@ui/components/button');

const {
  H2
} = BaseElements;

const {
  FormGroup,
  FormLabel,
  FormMeta,
  Input
} = Form;

const {
  FormattedMessage
} = ReactIntl;

const {
  default: styled
} = Styled;

const {
  colors
} = constants;

const {
  remcalc
} = fns;

const {
  normalizeCardNumber,
  normalizeCardCVV,
  normalizeCardExpiry
} = normalize;

const Container = styled.div`
  padding: ${remcalc(96)} ${remcalc(40)};
`;

const Title = styled(H2)`
  margin: 0 0 ${remcalc(18)} 0;
  font-size: ${remcalc(36)};
  color: ${colors.brandSecondaryColor};
`;

const Description = styled.p`
  margin-bottom: ${remcalc(24)}
  font-size: ${remcalc(16)};
  color: ${colors.brandSecondaryColor};
  max-width: ${remcalc(380)};
`;

const LongFormGroup = styled(FormGroup)`
  max-width: ${remcalc(380)};
  margin-bottom: ${remcalc(16)};
`;

const ShortFormGroups = styled.div`
  display: flex;
  flex-flow: row;
`;

const ShortFormGroup = styled(FormGroup)`
  max-width: ${remcalc(184)};
  margin-right: ${remcalc(12)}
  margin-bottom: ${remcalc(16)};
`;

const Buttons = styled.div`
  display: flex;
  flex-flow: row;
`;

const ProjectNameButtons = styled(Button)`
  margin-right: ${remcalc(6)};
`;

const CreateBilling = (props) => {
  const {
    handleSubmit,
    onBack,
    onSubmit,
    pristine,
    submitting
  } = props;

  const _onBack = (evt) => {
    evt.preventDefault();
    onBack(evt);
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Title>
          <FormattedMessage id='new-billing.title' />
        </Title>
        <Description>
          <FormattedMessage id='new-billing.description' />
        </Description>
        <LongFormGroup
          name='card-number'
          normalize={normalizeCardNumber}
          reduxForm
        >
          <FormLabel>Card number</FormLabel>
          <Input placeholder='xxxx-xxxx-xxxx-xxxx' />
          <FormMeta />
        </LongFormGroup>
        <ShortFormGroups>
          <ShortFormGroup
            name='cvv-code'
            normalize={normalizeCardCVV}
            reduxForm
          >
            <FormLabel>CVV Code</FormLabel>
            <Input placeholder='xxx' />
            <FormMeta />
          </ShortFormGroup>
          <ShortFormGroup
            name='expiry-date'
            normalize={normalizeCardExpiry}
            reduxForm
          >
            <FormLabel>Expiry date</FormLabel>
            <Input placeholder='mm/yy' />
            <FormMeta />
          </ShortFormGroup>
        </ShortFormGroups>
        <LongFormGroup name='name' reduxForm>
          <FormLabel>Name on card</FormLabel>
          <Input placeholder='' />
          <FormMeta />
        </LongFormGroup>
        <Buttons>
          <ProjectNameButtons onClick={_onBack} secondary>
            <FormattedMessage id='back' />
          </ProjectNameButtons>
          <ProjectNameButtons
            disabled={pristine || submitting}
            primary
            type='submit'
          >
            <FormattedMessage id='new-billing.save-details-label' />
          </ProjectNameButtons>
        </Buttons>
      </form>
    </Container>
  );
};

CreateBilling.propTypes = {
  handleSubmit: React.PropTypes.func.isRequired,
  onBack: React.PropTypes.func.isRequired,
  onSubmit: React.PropTypes.func.isRequired,
  pristine: React.PropTypes.bool.isRequired,
  submitting: React.PropTypes.bool.isRequired
};

module.exports = CreateBilling;
