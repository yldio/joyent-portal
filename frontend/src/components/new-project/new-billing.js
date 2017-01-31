const React = require('react');
const ReduxForm = require('redux-form');
const ReactIntl = require('react-intl');
const Styled = require('styled-components');

const constants = require('@ui/shared/constants');
const fns = require('@ui/shared/functions');

const Input = require('@ui/components/input');
const Button = require('@ui/components/button');

const {
  Field,
  reduxForm
} = ReduxForm;

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

const Container = styled.div`
  padding: ${remcalc(96)} ${remcalc(40)};
`;

const Title = styled.h2`
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

const LongInput = styled(Input)`
  max-width: ${remcalc(380)};
  margin-bottom: ${remcalc(16)};
`;

const ShortInputs = styled.div`
  display: flex;
  flex-flow: row;
`;

const ShortInput = styled(Input)`
  max-width: ${remcalc(184)};
  margin-right: ${remcalc(12)}
  margin-bottom: ${remcalc(16)};
`;

const Buttons = styled.div`
  display: flex;
  flex-flow: row;
`;

const ProjectNameButtons = styled(Button)`
  margin-right: ${remcalc(6)} !important;
`; // But why oh why do I need to use !important :'(

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
        <Field
          component={LongInput}
          label='Card number'
          name='card-number'
          placeholder='xxxx-xxxx-xxxx-xxxx'
        />
        <ShortInputs>
          <Field
            component={ShortInput}
            label='CVV code'
            name='cvv-code'
            placeholder='xxx'
          />
          <Field
            component={ShortInput}
            label='Expiry date'
            name='expiry-date'
            placeholder='mm/yy'
          />
        </ShortInputs>
        <Field
          component={LongInput}
          label='Name on card'
          name='name'
          placeholder=''
        />
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

module.exports = reduxForm({
  form: 'create-project',
  /*destroyOnUnmount: false,
  forceUnregisterOnUnmount: true/*,
  validate*/
})(CreateBilling);
