const React = require('react');
const ReactRedux = require('react-redux');
const ReduxForm = require('redux-form');
const selectors = require('@state/selectors');
const actions = require('@state/actions');

const PropTypes = require('@root/prop-types');
const CreateBilling = require('@components/new-project/new-billing');

const {
  connect
} = ReactRedux;

const {
  reduxForm
} = ReduxForm;

const {
  orgByIdSelector
} = selectors;

const {
  handleNewProject
} = actions;

const NewBillingForm = reduxForm({
  form: 'create-project'
})(CreateBilling);

const NewBilling = (props) => {

  const {
    handleNewProject,
    pushRoute,
    org
  } = props;

  const onBack = (evt) =>
    pushRoute(`/${org.id}/new-project/billing`);

  const onSubmit = (values) => {
    handleNewProject({
      values,
      org
    });
    pushRoute(`/${org.id}/projects`);
  };

  return (
    <NewBillingForm
      onBack={onBack}
      onSubmit={onSubmit}
    />
  );
};

NewBilling.propTypes = {
  handleNewProject: React.PropTypes.func.isRequired,
  org: PropTypes.org.isRequired,
  pushRoute: React.PropTypes.func
};

const mapStateToProps = (state, {
  match = {
    params: {}
  },
  push
}) => ({
  // TODO add cards - as above
  org: orgByIdSelector(match.params.org)(state),
  pushRoute: push
});

const mapDispatchToProps = (dispatch) => ({
  handleNewProject: (values) => dispatch(handleNewProject(values))
});

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewBilling);
