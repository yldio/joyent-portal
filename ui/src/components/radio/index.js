const React = require('react');
const constants = require('../../shared/constants');
const Styled = require('styled-components');

const {
  boxes
} = constants;

const {
  default: styled,
} = Styled;

let top;
const left = top = 5;

const CustomInputCircle = `
  content: '';
  position: absolute;
  width: 8px;
  height: 8px;
  background: rgb(100, 100, 100);
  top: ${top * 2}px;
  left: ${left * 2}px;
  border-radius: 100%;
`;

const StyledInput = styled.input`
  visibility: hidden;
  display: none;

  &:checked + span::after {
    ${CustomInputCircle}
  }
  &:disabled + span {
    background-color: rgb(249, 249, 249);
  }
  &:disabled + span::after {
    opacity: 0.3;
    ${CustomInputCircle}
  }
`;

const StyledLabel = styled.label`
`;

const StyledSpan = styled.span`
color: rgb(100, 100, 100);
position: relative;

&::before {
  content: '';
  position: absolute;
  width: 16px;
  height: 16px;
  background-color: rgb(255, 255, 255);
  box-shadow: ${boxes.insetShaddow};
  border: ${boxes.border.unchecked};
  top: ${top}px;
  left: ${left}px;
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
  // debugger
  // const _children = label && children ? children : null;

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
        {children}
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
