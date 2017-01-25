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
  handleInviteToggle,
  handlePeopleRoleTooltip,
  handlePeopleStatusTooltip,
  handleRoleUpdate,
  handleStatusUpdate,
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
  orgUI: orgUISelector(state),
  orgIndex: orgIndexSelector(params.org)(state),
  platformMembers: membersSelector(state)
});

const mapDispatchToProps = (dispatch) => ({
  handleToggle: () => dispatch(handleInviteToggle()),
  handleStatusTooltip: (id) => dispatch(handlePeopleStatusTooltip(id)),
  handleRoleTooltip: (id) => dispatch(handlePeopleRoleTooltip(id)),
  handleRoleUpdate: (updatedMember) =>
      dispatch(handleRoleUpdate(updatedMember)),
  handleStatusUpdate: (updatedMember) =>
    dispatch(handleStatusUpdate(updatedMember)),
});

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(People);
