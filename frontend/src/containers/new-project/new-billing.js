const React = require('react');
const ReactRedux = require('react-redux');
const selectors = require('@state/selectors');
const actions = require('@state/actions');

const PropTypes = require('@root/prop-types');
const NewBillingForm = require('@components/new-project/new-billing');

const {
  connect
} = ReactRedux;

const {
  orgByIdSelector
} = selectors;

const {
  handleNewProject
} = actions;

const NewBilling = (props) => {

  const {
    handleNewProject,
    router,
    org
  } = props;

  const onBack = (evt) =>
    router.transitionTo(`/${org.id}/new-project/billing`);

  const onSubmit = (values) => {
    handleNewProject({
      values,
      org
    });
    router.transitionTo(`/${org.id}/projects`);
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
)(NewBilling);
