const React = require('react');
const constants = require('../../shared/constants');
const Styled = require('styled-components');

const {
  boxes
} = constants;

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

const border = 1;
const StyledLabel = styled.label`
  color: rgb(100, 100, 100);
  position: absolute;
  width: ${24 - border}px;
  height: ${24 - border}px;
  top: 0;
  border-radius: 100%;
  background-color: rgb(255, 255, 255);
  box-shadow: ${boxes.insetShaddow};
  border: ${boxes.border.unchecked};

  &::after {
    opacity: 0;
    content: '';
    position: absolute;
    width: 8px;
    height: 8px;
    background: rgb(100, 100, 100);
    top: ${(23 / 2) - 4}px;
    left: ${(23 / 2) - 4}px;
    border-radius: 100%;
    transform: rotate(-45deg);
  }

  &:hover {
    &::after {
      opacity: 0.3;
    }
  }
`;

const StyledDiv = styled.div`
  width: 24px;
  height: 24px;
  position: relative;
`;

const TextLabel = styled.label`
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
  const _children = label && children ? children : null;

  return (
    <TextLabel>
      <StyledDiv>
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
        <StyledLabel />
      </StyledDiv>
      <span>
        {_children}
      </span>
    </TextLabel>
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
  name: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func,
  readOnly: React.PropTypes.bool,
  required: React.PropTypes.bool,
  selectionDirection: React.PropTypes.string,
  style: React.PropTypes.object,
  tabIndex: React.PropTypes.string,
  value: React.PropTypes.string.isRequired
};

module.exports = Radio;
