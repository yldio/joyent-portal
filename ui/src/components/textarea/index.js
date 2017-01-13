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
  color: ${props => props.error ? colors.alert : colors.fonts.regular}
`;

const InputField = styled.textarea`
  background: ${colors.brandSecondary};
  color: ${props => props.error ? colors.alert : colors.fonts.semibold}
  display: block;
  font-size: ${remcalc(16)};
  padding: ${remcalc('15 18')};
  visibility: visible;
  width: 100%;
  min-height: ${remcalc(96)};
  ${baseBox()};
  border-color: ${props => props.error ? colors.alert : ''};

  &:focus {
    border-color: ${boxes.border.checked};
    outline: none;
  }
`;

const Error = styled.span`
  float: right;
  color: ${colors.alert};
  font-size: ${remcalc(14)};
`;

const Textarea = ({
  autoComplete,
  autoFocus,
  children,
  className,
  disabled = false,
  error,
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
  const _error = error ? (<Error>{error}</Error>) : null;

  return (
    <div>
      <Label
        error={error}
        htmlFor={id}
      >
        {_label}
      </Label>
      {_error}
      <InputField
        aria-labelledby={labelledby}
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        disabled={disabled}
        error={error}
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

Textarea.propTypes = {
  autoComplete: React.PropTypes.string,
  autoFocus: React.PropTypes.bool,
  children: React.PropTypes.node,
  className: React.PropTypes.string,
  disabled: React.PropTypes.bool,
  error: React.PropTypes.string,
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

module.exports = Textarea;
