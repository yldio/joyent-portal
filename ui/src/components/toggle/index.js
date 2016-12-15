const constants = require('../../shared/constants');
const composers = require('../../shared/composers');
const fns = require('../../shared/functions');
const React = require('react');
const Styled = require('styled-components');

const {
  boxes,
  colors,
  typography
} = constants;

const {
  pseudoEl
} = composers;

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
  width: ${remcalc(110)};
`;

const StyledToggleLabel = styled.div`
  background-color: #E6E6E6;
  border: solid 1px #D8D8D8;
  border-radius: ${boxes.borderRadius};
  color: #000000;
  height: ${remcalc(54)};
  margin: 0.125rem;
  padding-left: ${remcalc(12)};
  position: relative;
  text-align: right;
  width: ${remcalc(106)};

  &::before {
    content: "Off";
    font-family: ${typography.fontPrimary};
    font-size: inherit;
    font-weight: bold;
    position: absolute;
    right: 24px;
    top: 19px;
  }

  &::after {
    background-color: #FFFFFF;
    border-radius: ${boxes.borderRadius};
    height: ${remcalc(46)};
    width: ${remcalc(46)};

    ${pseudoEl({
      top: '3px',
      left: '3px',
    })}
  }
`;

const StyledInput = styled.input`
  display: none;

  &:checked {
    & + .${classNames.label} {
      background: ${colors.confirmation};
      border: ${boxes.border.confirmed};
      color: #FFFFFF;
      padding-left: 0;
      padding-right: ${remcalc(12)};
      text-align: left;

      &::before {
        content: "On";
        left: 20px;
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
