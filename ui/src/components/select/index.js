const fns = require('../../shared/functions');
const reduxFormProxy = require('../../shared/redux-form-proxy');
const React = require('react');
const Styled = require('styled-components');

const Label = require('../form/label');
const LabelRow = require('../form/label-row');
const Msg = require('../form/msg');
const Outlet = require('../form/outlet');
const View = require('../form/view');

const {
  rndId
} = fns;

const {
  default: styled
} = Styled;

const defaultValue = rndId();

const StyledSelect = styled.select`
  ${Outlet}
`;

const Select = (props) => {
  const {
    children,
    disabled = false,
    error = '',
    id = rndId(),
    label = '',
    multiple = false,
    placeholder = '',
    value = defaultValue,
    warning = ''
  } = props;

  const _label = !label.length ? null : (
    <Label htmlFor={id}>
      {label}
    </Label>
  );

  const _placeholder = !placeholder ? null : (
    <option disabled value={defaultValue}>
      {placeholder}
    </option>
  );

  const msgType = error ? 'error' : (warning ? 'warning' : null);

  const _msg = !(error || warning) ? null : (
    <Msg type={msgType}>
      {error ? error : warning}
    </Msg>
  );

  return (
    <View {...props} id=''>
      <LabelRow>
        {_label}
        {_msg}
      </LabelRow>
      <StyledSelect
        defaultValue={defaultValue}
        disabled={disabled}
        id={id}
        multiple={multiple}
        placeholder={placeholder}
        value={_placeholder ? value : undefined}
      >
        {_placeholder}
        {children}
      </StyledSelect>
    </View>
  );
};

Select.propTypes = {
  children: React.PropTypes.node,
  disabled: React.PropTypes.bool,
  error: React.PropTypes.string,
  id: React.PropTypes.string,
  label: React.PropTypes.string,
  multiple: React.PropTypes.bool,
  placeholder: React.PropTypes.string,
  value: React.PropTypes.string,
  warning: React.PropTypes.string
};

module.exports = reduxFormProxy(Select);
