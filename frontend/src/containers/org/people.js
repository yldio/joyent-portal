import React from 'react';
import { connect } from 'react-redux';
import { LayoutContainer } from '@components/layout';
import PeopleSection from '@components/people-list';
import Section from './section';

import {
  peopleByOrgIdSelector,
  orgUISelector,
  orgIndexSelector,
  membersSelector
} from '@state/selectors';

import {
  addMemberToOrg,
  orgHandleInviteToggle,
  orgHandlePeopleRoleTooltip,
  orgHandlePeopleStatusTooltip,
  orgHandleMemberUpdate,
  orgRemoveMember
} from '@state/actions';

const People = (props) => (
  <Section {...props}>
    <LayoutContainer>
      <PeopleSection {...props} />
    </LayoutContainer>
  </Section>
);

const mapStateToProps = (state, {
  match = {
    params: {}
  }
}) => ({
  people: peopleByOrgIdSelector(match.params.org)(state),
  UI: orgUISelector(state),
  parentIndex: orgIndexSelector(match.params.org)(state),
  platformMembers: membersSelector(state)
});

const mapDispatchToProps = (dispatch) => ({
  addMemember: (member, callback) =>
    dispatch(addMemberToOrg(member, callback)),
  handleToggle: () =>
    dispatch(orgHandleInviteToggle()),
  handleStatusTooltip: (id) =>
    dispatch(orgHandlePeopleStatusTooltip(id)),
  handleRoleTooltip: (id) =>
    dispatch(orgHandlePeopleRoleTooltip(id)),
  handleMemberUpdate: (updatedMember) =>
    dispatch(orgHandleMemberUpdate(updatedMember)),
  removeMember: (removeData) =>
    dispatch(orgRemoveMember(removeData))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(People);
