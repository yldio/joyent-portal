const React = require('react');
const Styled = require('styled-components');

const Tooltip = require('@ui/components/tooltip');
const fns = require('@ui/shared/functions');
const composers = require('@ui/shared/composers');

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

const arrowPosition = {
  bottom: '100%',
  right: '10%'
};

const tooltipStyle = {
  position: 'absolute',
  top: 0,
  zIndex: 1
};

const PlainButton = styled.button`
  background: transparent;
  font-size: inherit;
  border: none;
  zIndex: 0;
  font-family: inherit;
  color: inherit;
`;

const tooltip = (person) => (
  <Tooltip
    arrowPosition={arrowPosition}
    key={person.uuid}
    style={tooltipStyle}
  >
    <li>Admin</li>
    <li>Read Only</li>
    <li>Unassigned</li>
  </Tooltip>
);

const PersonStatus = (props) => {

  const {
    toggledID,
    person,
    handleStatusTooltip
  } = props;

  const toggled = toggledID;
  const handleClick = () => handleStatusTooltip(person.uuid);

  return (
    <StyledWrapper toggled={toggled}>
      <PlainButton onClick={handleClick} >
        {person.status}
      </PlainButton>

      {toggledID === person.uuid ? tooltip(person) : null}
    </StyledWrapper>
  );
};

PersonStatus.propTypes = {
  handleStatusTooltip: React.PropTypes.func,
  person: React.PropTypes.object,
  toggledID: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.bool,
  ])
};

module.exports = PersonStatus;