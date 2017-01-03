const React = require('react');

const composers = require('../../shared/composers');
const constants = require('../../shared/constants');
const fns = require('../../shared/functions');
const Styled = require('styled-components');

const {
  boxes,
  colors
} = constants;

const {
  remcalc
} = fns;

const {
  baseBox
} = composers;

const {
  default: styled
} = Styled;

const Label = styled.label`
  color: #464646;
`;

const InputField = styled.input`
  background: ${colors.white};
  display: block;
  font-size: 16px;
  height: ${remcalc(50)};
  padding-left: ${remcalc(15)};
  padding-right: ${remcalc(15)};
  visibility: visible;
  width: 100%;

  ${baseBox()}

  &:focus {
    border-color: ${boxes.border.checked};
    outline: none;
  }
`;

const Input = ({
  autoComplete,
  autoFocus,
  children,
  className,
  disabled = false,
  form,
  id,
  inputMode,
  label,
  labelledby,
  list,
  name,
  onChange,
  pattern,
  placeholder,
  readOnly,
  required,
  selectionDirection,
  spellCheck,
  style,
  tabIndex,
  type,
  value
}) => {
  const _label = label || children;
  const _children = label && children ? children : null;

  return (
    <div>
      <Label htmlFor={id}>
        {_label}
      </Label>
      <InputField
        aria-labelledby={labelledby}
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        disabled={disabled}
        form={form}
        id={id}
        inputMode={inputMode}
        list={list}
        name={name}
        onChange={onChange}
        pattern={pattern}
        placeholder={placeholder}
        readOnly={readOnly}
        required={required}
        selectionDirection={selectionDirection}
        spellCheck={spellCheck}
        tabIndex={tabIndex}
        type={type}
        value={value}
      />
      {_children}
    </div>
  );
};

Input.propTypes = {
  autoComplete: React.PropTypes.string,
  autoFocus: React.PropTypes.bool,
  children: React.PropTypes.node,
  className: React.PropTypes.string,
  disabled: React.PropTypes.bool,
  form: React.PropTypes.string,
  id: React.PropTypes.string,
  inputMode: React.PropTypes.string,
  label: React.PropTypes.string,
  labelledby: React.PropTypes.string,
  list: React.PropTypes.string,
  name: React.PropTypes.string,
  onChange: React.PropTypes.func,
  pattern: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  readOnly: React.PropTypes.bool,
  required: React.PropTypes.bool,
  selectionDirection: React.PropTypes.string,
  spellCheck: React.PropTypes.bool,
  style: React.PropTypes.object,
  tabIndex: React.PropTypes.string,
  type: React.PropTypes.string,
  value: React.PropTypes.string
};

module.exports = Input;
