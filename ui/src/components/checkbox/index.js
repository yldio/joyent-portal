const classNames = require('classnames');
const React = require('react');
const constants = require('../../shared/constants');
const fns = require('../../shared/functions');
const match = require('../../shared/match');
const Styled = require('styled-components');

const {
  colors,
  boxes
} = constants;

const {
  remcalc
} = fns;

const {
  default: styled,
  css
} = Styled;

const styles = {
  ...colors
};

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
  width: 24px;
  height: 24px;
  top: 0;
  border-radius: ${boxes.borderRadius};
  background-color: rgb(255, 255, 255);
  box-shadow: ${boxes.insetShaddow};
  border: ${boxes.border.unchecked};

  &::after {
    opacity: 0;
    content: '';
    position: absolute;
    width: 9px;
    height: 4px;
    background: transparent;
    top: 7px;
    left: 7px;
    border: 3px solid #333;
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
  width: 24px;
  height: 24px;
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
}) => {
  return (
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
};

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

module.exports = Checkbox;
