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
`;

const StyledLabel = styled.label`
  color: #646464;
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
  const cn = classNames(
    className,
    styles.checkbox,
    checked ? styles.checked : '',
    disabled ? styles.disabled : ''
  );

  return (
    <StyledLabel className={styles.label} htmlFor={id}>
      <StyledInput
        checked={checked}
        className={cn}
        disabled={disabled}
        form={form}
        id={id}
        name={name}
        onChange={onChange}
        readOnly={readOnly}
        required={required}
        style={style}
        tabIndex={tabIndex}
        type='checkbox'
      />
      <span>{children}</span>
    </StyledLabel>
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
