const constants = require('../../shared/constants');
const fns = require('../../shared/functions');
const React = require('react');
const Styled = require('styled-components');

const {
  boxes,
  colors
} = constants;

const {
  remcalc,
  rndId
} = fns;

const {
  default: styled
} = Styled;

const classNames = {
  label: rndId()
};

const StyledLabel = styled.label`
  border-radius: ${boxes.borderRadius};
  color: #464646;
  height: 2.5rem;
  width: 110px;
`;

const StyledToggleLabel = styled.div`
  background-color: #E6E6E6;
  border: solid 1px #D8D8D8;
  border-radius: ${boxes.borderRadius};
  color: #000000;
  height: ${remcalc(54)};
  margin: 0.125rem;
  padding: ${remcalc('12 12 12 0')};
  position: relative;
  text-align: right;
  width: ${remcalc(106)};

  &::before {
    content: "Off";
    font-family: inherit;
    font-size: inherit;
    font-weight: bold;
    position: absolute;
    right: 14px;
    top: 13px;
  }

  &::after {
    background-color: #FFFFFF;
    border-radius: ${boxes.borderRadius};
    content: "";
    height: ${remcalc(46)};
    left: 3px;
    position: absolute;
    top: 3px;
    width: ${remcalc(46)};
  }
`;

const StyledInput = styled.input`
  display: none;

  &:checked {
    & + .${classNames.label} {
      background: ${colors.confirmation};
      border: ${boxes.border.confirmed};
      color: #FFFFFF;
      padding: ${remcalc('12 0 12 12')};
      text-align: left;

      &::before {
        content: "On";
        left: 14px;
        right: auto;
      }

      &::after {
        left: auto;
        right: 3px;
      }
    }
  }
`;

const Toggle = ({
  checked,
  className,
  defaultChecked,
  id = rndId(),
  style
}) => {
  return (
    <StyledLabel
      className={className}
      htmlFor={id}
      style={style}
    >
      <StyledInput
        checked={checked}
        id={id}
        type='checkbox'
      />
      <StyledToggleLabel className={classNames.label} />
    </StyledLabel>
  );
};

Toggle.propTypes = {
  checked: React.PropTypes.bool,
  className: React.PropTypes.string,
  defaultChecked: React.PropTypes.bool,
  id: React.PropTypes.string,
  style: React.PropTypes.object
};

module.exports = Toggle;
