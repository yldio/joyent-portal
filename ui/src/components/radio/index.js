const React = require('react');
const constants = require('../../shared/constants');
const Styled = require('styled-components');
const fns = require('../../shared/functions');

const {
  boxes,
  colors
} = constants;

const {
  remcalc
} = fns;

const {
  default: styled,
} = Styled;

const CustomInputCircle = `
  content: '';
  position: absolute;
  width: 8px;
	height: 8px;
  background: #646464;
  top: -14px;
  left: 14px;
  border-radius: 100%;
`;

const StyledInput = styled.input`
  visibility: hidden;
  display: none;

  &:checked + span::after {
    ${CustomInputCircle}
  }
  &:disabled + span {
    background-color: ${colors.inactiveBackground};
  }
  &:disabled + span::after {
    opacity: 0.3;
    ${CustomInputCircle}
  }
`;

const StyledLabel = styled.label`
`;

const StyledContent = styled.div`
  margin-left: ${remcalc(45)};
  padding-top: ${remcalc(10)};
`;

const StyledSpan = styled.span`
  color: #646464;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    width: ${remcalc(24)};
    height: ${remcalc(24)};
    background-color: ${colors.inactiveBackground};
    box-shadow: ${boxes.insetShaddow};
    border: ${boxes.border.unchecked};
    top: 5px;
    left: 5px;
    border-radius: 100%;
  }

  &:hover {
    &::after {
      opacity: 0.3;
    }
  }
`;

const Radio = ({
  checked,
  children,
  className,
  defaultChecked,
  disabled = false,
  form,
  id,
  label,
  name,
  onChange,
  readOnly,
  required,
  selectionDirection,
  style,
  tabIndex,
  value
}) => {

  return (
    <StyledLabel>
      <StyledInput
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        form={form}
        id={id}
        name={name}
        onChange={onChange}
        readOnly={readOnly}
        required={required}
        selectionDirection={selectionDirection}
        tabIndex={tabIndex}
        type='radio'
        value={value}
      />
      <StyledSpan>
        <StyledContent>
          {children}
        </StyledContent>
      </StyledSpan>
    </StyledLabel>
  );
};

Radio.propTypes = {
  checked: React.PropTypes.bool,
  children: React.PropTypes.node,
  className: React.PropTypes.string,
  defaultChecked: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
  form: React.PropTypes.string,
  id: React.PropTypes.string,
  label: React.PropTypes.string,
  name: React.PropTypes.string,
  onChange: React.PropTypes.func,
  readOnly: React.PropTypes.bool,
  required: React.PropTypes.bool,
  selectionDirection: React.PropTypes.string,
  style: React.PropTypes.object,
  tabIndex: React.PropTypes.string,
  value: React.PropTypes.string.isRequired
};

module.exports = Radio;
