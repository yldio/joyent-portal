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
  projecthandleInviteToggle,
  projecthandlePeopleRoleTooltip,
  projecthandlePeopleStatusTooltip,
  projecthandleMemberUpdate,
  projectremoveMember,
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
  handleToggle: () => dispatch(projecthandleInviteToggle()),
  handleStatusTooltip: (id) => dispatch(projecthandlePeopleStatusTooltip(id)),
  handleRoleTooltip: (id) => dispatch(projecthandlePeopleRoleTooltip(id)),
  handleMemberUpdate: (updatedMember) =>
    dispatch(projecthandleMemberUpdate(updatedMember)),
  removeMember: (removeData) =>
    dispatch(projectremoveMember(removeData)),

});

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(People);
