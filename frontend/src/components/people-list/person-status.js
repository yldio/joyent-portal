const React = require('react');
const Styled = require('styled-components');

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

const PersonStatus = (props) => {

  const {
    toggled,
    person,
    handleStatusTooltip
  } = props;

  return (
    <StyledWrapper toggled={toggled}>
      <a
        onClick={handleStatusTooltip}
        role="tooltip"
        tabIndex="0"
      >
        {person.status}
      </a>
    </StyledWrapper>
  );
};

PersonStatus.propTypes = {
  handleStatusTooltip: React.PropTypes.bool,
  person: React.PropTypes.object,
  toggled: React.PropTypes.bool,
};

module.exports = PersonStatus;