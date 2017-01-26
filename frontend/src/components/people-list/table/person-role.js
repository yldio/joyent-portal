const React = require('react');
const Styled = require('styled-components');

const fns = require('@ui/shared/functions');
const composers = require('@ui/shared/composers');

const Tooltip = require('./tooltip');

const {
  pseudoEl
} = composers;

const {
  default: styled
} = Styled;

const {
  remcalc
} = fns;

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
  font-family: inherit;
  color: inherit;
`;

const PersonRole = (props) => {

  const {
    toggledID,
    membersRolesOptions,
    person,
    personIndex,
    handleRoleTooltip,
    handleMemberUpdate,
    parentIndex
  } = props;

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

  return (
    <StyledWrapper toggled={toggled}>
      <PlainButton onClick={handleClick} >
        {person.role}
      </PlainButton>

      { toggledID === person.uuid
        ? <Tooltip
          handleSelect={handleOptionSelect}
          options={membersRolesOptions}
          parentIndex={parentIndex}
          person={_person}
          personAttr="role"
          personIndex={personIndex}
          />
        : null }
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
    React.PropTypes.bool,
  ])
};

module.exports = PersonRole;