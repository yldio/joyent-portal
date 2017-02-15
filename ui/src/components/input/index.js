const fns = require('../../shared/functions');
const reduxFormProxy = require('../../shared/redux-form-proxy');
const composers = require('../../shared/composers');

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
  Baseline
} = composers;

const {
  default: styled
} = Styled;

const StyledInput = styled.input`
  ${Outlet}
`;

const Input = (props) => {
  const {
    children,
    id = rndId(),
    label = '',
    error = '',
    warning = ''
  } = props;

  const viewProps = [
    'children',
    'style',
    'className'
  ];

  // reset props for <input />
  const newProps = Object.keys(props).reduce((sum, key) => ({
    ...sum,
    [key]: viewProps.indexOf(key) < 0 ? props[key] : null
  }),{});

  const _label = !label.length ? null : (
    <Label htmlFor={id}>
      {label}
    </Label>
  );

  const msgType = error ? 'error' : (warning ? 'warning' : null);

  const _msg = !(error || warning) ? null : (
    <Msg type={msgType}>
      {error ? error : warning}
    </Msg>
  );

  return (
    <View className={props.className} style={props.style}>
      <LabelRow>
        {_label}
        {_msg}
      </LabelRow>
      <StyledInput {...newProps} />
      {children}
    </View>
  );
};

Input.propTypes = {
  children: React.PropTypes.node,
  className: React.PropTypes.string,
  error: React.PropTypes.string,
  id: React.PropTypes.string,
  label: React.PropTypes.string,
  style: React.PropTypes.object,
  warning: React.PropTypes.string
};

module.exports = reduxFormProxy(
  Baseline(Input)
);
