const React = require('react');
const ReactRedux = require('react-redux');
const selectors = require('@state/selectors');
const actions = require('@state/actions');

const PropTypes = require('@root/prop-types');
const NewProjectForm = require('@components/new-project');

const {
  connect
} = ReactRedux;

const {
  orgByIdSelector
} = selectors;

const {
  handleNewProject
} = actions;

const NewProject = (props) => {

  const {
    handleNewProject,
    org
  } = props;

  return (
    <NewProjectForm handleSubmit={handleNewProject} org={org} />
  );
};

NewProject.propTypes = {
  handleNewProject: React.PropTypes.func.isRequired,
  org: PropTypes.org.isRequired
};
// TODO we'll need to know whether there any cards
// otherwise go to new billing straight away 
const mapStateToProps = (state, {
  params = {}
}) => ({
  org: orgByIdSelector(params.org)(state)
});

const mapDispatchToProps = (dispatch) => ({
  handleNewProject: () => dispatch(handleNewProject())
});

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewProject);
