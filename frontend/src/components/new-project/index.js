const React = require('react');
const ReduxForm = require('redux-form');
const ReactIntl = require('react-intl');
const Styled = require('styled-components');

const constants = require('@ui/shared/constants');
const fns = require('@ui/shared/functions');

const Input = require('@ui/components/input');
const Button = require('@ui/components/button');

const {
  Field
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

const ProjectNameInput = styled(Input)`
  max-width: ${remcalc(380)};
  margin-bottom: ${remcalc(16)};
`;

const Buttons = styled.div`
  display: flex;
  flex-flow: row;
`;

const LeftButton = styled(Button)`
  margin-right: ${remcalc(6)};
`;

const CreateProject = (props) => {
  const {
    handleSubmit,
    onCancel,
    onSubmit,
    pristine,
    submitting
  } = props;

  const _onCancel = (evt) => {
    evt.preventDefault();
    onCancel();
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Title>
          <FormattedMessage id='new-project.title' />
        </Title>
        <Description>
          <FormattedMessage id='new-project.description' />
        </Description>
        <Field
          component={ProjectNameInput}
          label='Project name'
          name='project-name'
          placeholder='Project name'
        />
        <Buttons>
          <LeftButton onClick={_onCancel} secondary>
            <FormattedMessage id='cancel' />
          </LeftButton>
          <Button
            disabled={pristine || submitting}
            primary
            type='submit'
          >
            <FormattedMessage id='submit' />
          </Button>
        </Buttons>
      </form>
    </Container>
  );
};

CreateProject.propTypes = {
  handleSubmit: React.PropTypes.func.isRequired,
  onCancel: React.PropTypes.func.isRequired,
  onSubmit: React.PropTypes.func.isRequired,
  pristine: React.PropTypes.bool.isRequired,
  submitting: React.PropTypes.bool.isRequired
};

module.exports = CreateProject;
