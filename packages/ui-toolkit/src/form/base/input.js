import React from 'react';
import typography from '../../typography';
import { insetShaddow, borderRadius, border } from '../../boxes';
import { Subscriber } from 'react-broadcast';
import styled, { css } from 'styled-components';
import remcalc from 'remcalc';
import PropTypes from 'prop-types';
import is from 'styled-is';

const colorWithDisabled = props =>
  props.disabled ? props.theme.disabled : props.theme.text;

const colorWithDefaultValue = props =>
  props.value === props.defaultValue
    ? props.theme.disabled
    : colorWithDisabled(props);

const color = props =>
  props.defaultValue ? colorWithDefaultValue(props) : colorWithDisabled(props);

const height = props => (props.multiple ? 'auto' : remcalc(48));

const paddingTop = props => (props.multiple ? remcalc(20) : remcalc(13));

const style = css`
  box-sizing: border-box;

  width: 100%;
  height: ${height};

  margin-bottom: ${remcalc(8)};
  margin-top: ${remcalc(8)};
  padding: ${paddingTop} ${remcalc(18)};

  border-radius: ${borderRadius};
  background-color: ${props => props.theme.white};
  border: ${border.unchecked};

  ${is('error')`
    border-color: ${props => props.theme.redDark}
  `};

  ${is('warning')`
    border-color: ${props => props.theme.orangeDark}
  `};

  ${is('success')`
    border-color: ${props => props.theme.greenDark}
  `};

  font-size: ${remcalc(15)};
  line-height: normal !important;

  ${typography.normal};
  font-style: normal;
  font-stretch: normal;
  color: ${color};

  appearance: none;
  outline: 0;

  &:focus {
    border-color: ${props => props.theme.primary};
    outline: 0;
  }
`;

const BaseInput = Component => props => {
  const render = value => {
    const _value = value || {};
    const { input = {}, meta = {}, id = '' } = _value;

    const hasError = Boolean(props.error || _value.error || meta.error);
    const hasWarning = Boolean(props.warning || _value.warning || meta.warning);
    const hasSuccess = Boolean(props.success || _value.success || meta.success);

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
    <Subscriber channel="input-group">
      {render}
    </Subscriber>
  );
};

BaseInput.propTypes = {
  error: PropTypes.bool,
  warning: PropTypes.bool
};

export default BaseInput;

export const Stylable = Component => {
  const stylable = typeof Component === 'string'
    ? styled[Component]
    : styled(Component);

  return stylable`
    ${style}
  `;
};
