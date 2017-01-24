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
  
  &:after {
    border-left: ${remcalc(5)} solid transparent;
    border-right: ${remcalc(5)} solid transparent;
    border-${borderSide}: ${remcalc(5)} solid black;
    
    ${pseudoEl({
      top: '50%',
      right: remcalc(10)
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
    handleRoleTooltip
  } = props;

  const toggled = toggledID;
  const handleClick = () => handleRoleTooltip(person.uuid);

  return (
    <StyledWrapper toggled={toggled}>
      <PlainButton onClick={handleClick} >
        {person.role}
      </PlainButton>

      { toggledID === person.uuid
        ? <Tooltip options={membersRolesOptions} person={person} />
        : null }
    </StyledWrapper>
  );
};

PersonRole.propTypes = {
  handleRoleTooltip: React.PropTypes.func,
  membersRolesOptions: React.PropTypes.array,
  person: React.PropTypes.object,
  toggledID: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.bool,
  ])
};

module.exports = PersonRole;