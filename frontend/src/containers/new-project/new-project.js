const React = require('react');
const ReactRedux = require('react-redux');
const selectors = require('@state/selectors');

const PropTypes = require('@root/prop-types');
const NewProjectForm = require('@components/new-project');

const {
  connect
} = ReactRedux;

const {
  orgByIdSelector
} = selectors;

const NewProject = (props) => {

  const {
    org,
    router
  } = props;

  const onCancel = (values) =>
    router.transitionTo(`/${org.id}/projects`);

  const onSubmit = (values) =>
    router.transitionTo(`/${org.id}/new-project/billing`);

  return (
    <NewProjectForm
      onCancel={onCancel}
      onSubmit={onSubmit}
      org={org}
    />
  );
};

NewProject.propTypes = {
  org: PropTypes.org.isRequired,
  router: React.PropTypes.object
};
// TODO we'll need to know whether there any cards
// otherwise go to new billing straight away
const mapStateToProps = (state, {
  match = {}
}) => ({
  org: orgByIdSelector(match.params.org)(state),
  router: state.app.router
});

const mapDispatchToProps = (dispatch) => ({});

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewProject);
