const React = require('react');
const ReactRedux = require('react-redux');
const selectors = require('@state/selectors');
const actions = require('@state/actions');

const PropTypes = require('@root/prop-types');
const BillingForm = require('@components/new-project/billing');

const {
  connect
} = ReactRedux;

const {
  orgByIdSelector
} = selectors;

const {
  handleNewProject
} = actions;

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
    router.transitionTo(`/${org.id}/projects`);
  };

  const onNewBilling = (evt) =>
    router.transitionTo(`/${org.id}/new-project/new-billing`);

  return (
    <BillingForm
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
  params = {}
}) => ({
  // TODO add cards - as above
  org: orgByIdSelector(params.org)(state),
  router: state.app.router
});

const mapDispatchToProps = (dispatch) => ({
  handleNewProject: (values) => dispatch(handleNewProject(values))
});

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(Billing);
