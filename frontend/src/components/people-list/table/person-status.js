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

const PersonStatus = (props) => {

  const {
    toggledID,
    membersStatusOptions,
    person,
    personIndex,
    handleStatusTooltip,
    handleStatusUpdate,
    orgIndex
  } = props;

  const toggled = toggledID;
  const handleClick = () => handleStatusTooltip(person.uuid);
  const handleOptionSelect = (updatedMember) =>
    handleStatusUpdate(updatedMember);

  // Only send relevent info as props
  const _person =  {
    uuid: person.uuid,
    status: person.status,
    role: person.role
  };

  return (
    <StyledWrapper toggled={toggled}>
      <PlainButton onClick={handleClick} >
        {person.status}
      </PlainButton>

      { toggledID === person.uuid
        ? <Tooltip
          handleSelect={handleOptionSelect}
          options={membersStatusOptions}
          orgIndex={orgIndex}
          person={_person}
          personAttr="status"
          personIndex={personIndex}
          />
        : null }
    </StyledWrapper>
  );
};

PersonStatus.propTypes = {
  handleStatusTooltip: React.PropTypes.func,
  handleStatusUpdate: React.PropTypes.func,
  membersStatusOptions: React.PropTypes.array,
  orgIndex: React.PropTypes.number,
  person: React.PropTypes.object,
  personIndex: React.PropTypes.number,
  toggledID: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.bool,
  ])
};

module.exports = PersonStatus;