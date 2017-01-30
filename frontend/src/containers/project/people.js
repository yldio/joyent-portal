const React = require('react');
const ReactRedux = require('react-redux');
const PeopleSection = require('@components/people-list');
const selectors = require('@state/selectors');
const Section = require('./section');
const actions = require('@state/actions');

const {
  connect
} = ReactRedux;

const {
  peopleByProjectIdSelector,
  projectUISelector,
  projectIndexByIdSelect,
  membersSelector,
} = selectors;

const {
  projectHandleInviteToggle,
  projectHandlePeopleRoleTooltip,
  projectHandlePeopleStatusTooltip,
  projectHandleMemberUpdate,
  projectRemoveMember,
} = actions;

const People = (props) => {

  return (
    <Section {...props}>
      <PeopleSection {...props} />
    </Section>
  );
};

const mapStateToProps = (state, {
  params = {}
}) => ({
  people: peopleByProjectIdSelector(params.projectId)(state),
  UI: projectUISelector(state),
  parentIndex: projectIndexByIdSelect(params.projectId)(state),
  platformMembers: membersSelector(state)
});

const mapDispatchToProps = (dispatch) => ({
  handleToggle: () => dispatch(projectHandleInviteToggle()),
  handleStatusTooltip: (id) => dispatch(projectHandlePeopleStatusTooltip(id)),
  handleRoleTooltip: (id) => dispatch(projectHandlePeopleRoleTooltip(id)),
  handleMemberUpdate: (updatedMember) =>
    dispatch(projectHandleMemberUpdate(updatedMember)),
  removeMember: (removeData) =>
    dispatch(projectRemoveMember(removeData)),

});

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(People);
