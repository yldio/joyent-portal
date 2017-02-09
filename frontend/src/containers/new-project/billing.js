const React = require('react');
const ReactRedux = require('react-redux');
const ReduxForm = require('redux-form');
const selectors = require('@state/selectors');
const actions = require('@state/actions');

const PropTypes = require('@root/prop-types');
const NewProjectBilling = require('@components/new-project/billing');

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

const NewProjectBillingForm = reduxForm({
  form: 'create-project',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
})(NewProjectBilling);

const Billing = (props) => {

  const {
    cards,
    handleNewProject,
    router,
    org
  } = props;

  const onSubmit = (values) => {
    // TODO will need to save exisiting card to project
    console.log('NewBilling values = ', values);
    handleNewProject({
      values,
      org
    });
    router.push(`/${org.id}/projects`);
  };

  const onNewBilling = (evt) =>
    router.push(`/${org.id}/new-project/new-billing`);

  return (
    <NewProjectBillingForm
      cards={cards}
      onNewBilling={onNewBilling}
      onSubmit={onSubmit}
      org={org}
    />
  );
};

Billing.propTypes = {
  cards: React.PropTypes.array, // TODO set up example card in thingie data
  handleNewProject: React.PropTypes.func.isRequired,
  org: PropTypes.org.isRequired,
  router: React.PropTypes.object
};

const mapStateToProps = (state, {
  match = {
    params: {}
  }
}) => ({
  // TODO add cards - as above
  org: orgByIdSelector(match.params.org)(state),
  router: state.app.router
});

const mapDispatchToProps = (dispatch) => ({
  handleNewProject: (values) => dispatch(handleNewProject(values))
});

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(Billing);
