const composers = require('../../shared/composers');
const constants = require('../../shared/constants');
const fns = require('../../shared/functions');
const React = require('react');
const Styled = require('styled-components');

const {
  baseBox
} = composers;

const {
  colors
} = constants;

const {
  rndId
} = fns;

const {
  default: styled
} = Styled;

const StyledLabel = styled.label`
  color: #464646;
`;

const StyledInput = styled.input`
  background: ${colors.background};
  display: block;
  height: 50px;
  padding-left: 15px;
  padding-right: 15px;
  visibility: visible;
  width: 100%;

  ${baseBox()}

  :focus {
    border-color: ${colors.borderSelected};
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
  id = rndId(),
  inputMode,
  label,
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

  const labelledby = `${rndId()}-label`;

  return (
    <div className={className}>
      <StyledLabel htmlFor={id}>
        {_label}
      </StyledLabel>
      <StyledInput
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
