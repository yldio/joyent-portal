import styled from 'styled-components';
import React from 'react';

import { remcalc } from '@ui/shared/functions';
import { pseudoEl, typography } from '@ui/shared/composers';
import Tooltip from './tooltip';

const borderSide = props => props.toggled
  ? 'bottom'
  : 'top';

const StyledWrapper = styled.div`
  position: relative;
  display: inline-block;
  min-width: ${remcalc(130)};

  &:after {
    border-left: ${remcalc(5)} solid transparent;
    border-right: ${remcalc(5)} solid transparent;
    border-${borderSide}: ${remcalc(5)} solid black;

    ${pseudoEl({
      top: '40%',
      right: remcalc(-10)
    })}
  }
`;

const PlainButton = styled.button`
  background: transparent;
  font-size: inherit;
  border: none;
  zIndex: 0;
  color: inherit;

  ${typography.libreFranklin};
  ${typography.normal};
`;

const PersonRole = ({
  toggledID,
  membersRolesOptions,
  person,
  personIndex,
  handleRoleTooltip,
  handleMemberUpdate,
  parentIndex
}) => {
  const toggled = toggledID === person.uuid;
  const handleClick = () => handleRoleTooltip(person.uuid);
  const handleOptionSelect = (updatedMember) =>
    handleMemberUpdate(updatedMember);

  // Only send relevent info as props
  const _person =  {
    uuid: person.uuid,
    status: person.status,
    role: person.role
  };

  const tooltip = !toggled ? null : (
    <Tooltip
      handleSelect={handleOptionSelect}
      options={membersRolesOptions}
      parentIndex={parentIndex}
      person={_person}
      personAttr='role'
      personIndex={personIndex}
    />
  );

  return (
    <StyledWrapper toggled={toggled}>
      <PlainButton onClick={handleClick} >
        {person.role}
      </PlainButton>
      {tooltip}
    </StyledWrapper>
  );
};

PersonRole.propTypes = {
  handleMemberUpdate: React.PropTypes.func,
  handleRoleTooltip: React.PropTypes.func,
  membersRolesOptions: React.PropTypes.array,
  parentIndex: React.PropTypes.number,
  person: React.PropTypes.object,
  personIndex: React.PropTypes.number,
  toggledID: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.bool
  ])
};

export default PersonRole;
