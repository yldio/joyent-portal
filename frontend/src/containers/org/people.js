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
  peopleByOrgIdSelector,
  orgUISelector,
  orgIndexSelector,
  membersSelector,
} = selectors;

const {
  addMemberToOrg,
  orgHandleInviteToggle,
  orgHandlePeopleRoleTooltip,
  orgHandlePeopleStatusTooltip,
  orgHandleMemberUpdate,
  orgRemoveMember,
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
  people: peopleByOrgIdSelector(params.org)(state),
  UI: orgUISelector(state),
  parentIndex: orgIndexSelector(params.org)(state),
  platformMembers: membersSelector(state)
});

const mapDispatchToProps = (dispatch) => ({
  addMemember: (member) => dispatch(addMemberToOrg(member)),
  handleToggle: () => dispatch(orgHandleInviteToggle()),
  handleStatusTooltip: (id) => dispatch(orgHandlePeopleStatusTooltip(id)),
  handleRoleTooltip: (id) => dispatch(orgHandlePeopleRoleTooltip(id)),
  handleMemberUpdate: (updatedMember) =>
      dispatch(orgHandleMemberUpdate(updatedMember)),
  removeMember: (removeData) =>
    dispatch(orgRemoveMember(removeData)),

});

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(People);
