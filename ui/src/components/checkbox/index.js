const composers = require('../../shared/composers');
const constants = require('../../shared/constants');
const fns = require('../../shared/functions');
const React = require('react');
const Styled = require('styled-components');

const {
  boxes
} = constants;

const {
  Baseline
} = composers;

const {
  remcalc
} = fns;

const {
  default: styled,
} = Styled;

const StyledInput = styled.input`
  visibility: hidden;
  &:checked + label::after {
    opacity: 1;
  }
  &:disabled + label {
    background-color: rgb(249, 249, 249);
  }
  &:disabled + label::after {
    opacity: 0.3;
  }
`;

const StyledLabel = styled.label`
  color: rgb(100, 100, 100);
  position: absolute;
  width: ${remcalc(24)};
  height: ${remcalc(24)};
  top: 0;
  border-radius: ${boxes.borderRadius};
  background-color: rgb(255, 255, 255);
  box-shadow: ${boxes.insetShaddow};
  border: ${boxes.border.unchecked};

  &::after {
    opacity: 0;
    content: '';
    position: absolute;
    width: ${remcalc(9)};
    height: ${remcalc(4)};
    background: transparent;
    top: ${remcalc(7)};
    left: ${remcalc(7)};
    border: ${remcalc(3)} solid #333;
    border-top: none;
    border-right: none;
    transform: rotate(-45deg);
  }

  &:hover {
    &::after {
      opacity: 0.3;
    }
  }
`;

const StyledDiv = styled.div`
  width: ${remcalc(24)};
  height: ${remcalc(24)};
  position: relative;
`;

const Checkbox = ({
  checked = false,
  children,
  className,
  disabled = false,
  form,
  id,
  name,
  onChange,
  readOnly,
  required,
  selectionDirection,
  style,
  tabIndex
}) => (
  <StyledDiv>
    <StyledInput
      checked={checked}
      disabled={disabled}
      form={form}
      name={name}
      onChange={onChange}
      readOnly={readOnly}
      required={required}
      style={style}
      tabIndex={tabIndex}
      type='checkbox'
    />
    <StyledLabel>
      <span>{children}</span>
    </StyledLabel>
  </StyledDiv>
);

Checkbox.propTypes = {
  checked: React.PropTypes.bool,
  children: React.PropTypes.node,
  className: React.PropTypes.string,
  disabled: React.PropTypes.bool,
  form: React.PropTypes.string,
  id: React.PropTypes.string,
  name: React.PropTypes.string,
  onChange: React.PropTypes.func,
  readOnly: React.PropTypes.bool,
  required: React.PropTypes.bool,
  selectionDirection: React.PropTypes.string,
  style: React.PropTypes.object,
  tabIndex: React.PropTypes.string
};

module.exports = Baseline(
  Checkbox
);
