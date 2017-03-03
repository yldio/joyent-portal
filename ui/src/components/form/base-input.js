import styled, { css } from 'styled-components';
import { Subscriber } from 'react-broadcast';
import { colors, boxes } from '../../shared/constants';
import { typography } from '../../shared/composers';
import { remcalc, is } from '../../shared/functions';
import React from 'react';

const colorWithDisabled = (props) => props.disabled
  ? colors.inactive.default
  : colors.fonts.regular;

const colorWithDefaultValue = (props) => props.value === props.defaultValue
  ? colors.inactive.default
  : colorWithDisabled(props);

const color = (props) => props.defaultValue
  ? colorWithDefaultValue(props)
  : colorWithDisabled(props);

const height = (props) => !props.multiple
  ? remcalc(48)
  : 'auto';

const paddingTop = (props) => props.multiple
  ? remcalc(20)
  : remcalc(13);

const style = css`
  box-sizing: border-box;

  width: 100%;
  height: ${height};

  margin-bottom: ${remcalc(8)};
  margin-top: ${remcalc(8)};
  padding: ${paddingTop} ${remcalc(18)};

  border-radius: ${boxes.borderRadius};
  background-color: ${colors.base.white};
  box-shadow: ${boxes.insetShaddow};
  border: ${boxes.border.unchecked};

  ${is('error')`
    border-color: ${colors.inputError}
  `};

  ${is('warning')`
    border-color: ${colors.inputWarning}
  `};

  ${is('success')`
    border-color: ${colors.base.green}
  `};

  font-size: ${remcalc(16)};
  line-height: normal !important;

  ${typography.normal};
  font-style: normal;
  font-stretch: normal;
  color: ${color};

  appearance: none;
  outline: 0;

  &:focus {
    border-color: ${colors.base.primary};
    outline: 0;
  }
`;

const BaseInput = (Component) => (props) => {
  const render = (value) => {
    const _value = (value || {});

    const {
      input = {},
      meta = {},
      id = ''
    } = _value;

    const hasError = !!(
      props.error || // eslint-disable-line react/prop-types
      _value.error ||
      meta.error
    );

    const hasWarning = !!(
      props.warning || // eslint-disable-line react/prop-types
      _value.warning ||
      meta.warning
    );

    const hasSuccess = !!(
      props.success || // eslint-disable-line react/prop-types
      _value.success ||
      meta.success
    );

    return (
      <Component
        {...props}
        {...input}
        id={id}
        error={hasError}
        warning={hasWarning}
        success={hasSuccess}
      />
    );
  };

  return (
    <Subscriber channel='input-group'>
      {render}
    </Subscriber>
  );
};

BaseInput.propTypes = {
  error: React.PropTypes.bool,
  warning: React.PropTypes.bool
};

export default BaseInput;

export const Stylable = (Component) => {
  const stylable = typeof Component === 'string'
    ? styled[Component]
    : styled(Component);

  return stylable`
    ${style}
  `;
};
