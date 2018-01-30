import React from 'react';
import { Subscriber } from 'joy-react-broadcast';
import styled, { css } from 'styled-components';
import remcalc from 'remcalc';
import is, { isNot } from 'styled-is';
import PropTypes from 'prop-types';

const colorWithDisabled = props =>
  props.disabled ? props.theme.disabled : props.theme.text;

const colorWithDefaultValue = props =>
  props.value === props.defaultValue
    ? props.theme.disabled
    : colorWithDisabled(props);

const color = props =>
  props.defaultValue ? colorWithDefaultValue(props) : colorWithDisabled(props);

const height = props =>
  props.multiple ? 'auto' : props.textarea ? remcalc(96) : remcalc(48);

const paddingTop = props => (props.multiple ? remcalc(20) : remcalc(13));

const style = css`
  box-sizing: border-box;

  width: ${remcalc(300)};
  height: ${height};
  min-height: ${height};

  margin-bottom: ${remcalc(8)};
  margin-top: ${remcalc(8)};
  padding: ${paddingTop} ${remcalc(18)};

  border-radius: ${props => props.theme.borderRadius};
  background-color: ${props => props.theme.white};
  border: ${remcalc(1)} solid ${props => props.theme.grey};
  color: ${color};

  &::-webkit-input-placeholder {
    color: ${props => props.theme.textDisabled};
  }
  &::-moz-placeholder {
    color: ${props => props.theme.textDisabled};
  }
  &:-ms-input-placeholder {
    color: ${props => props.theme.textDisabled};
  }

  &:invalid {
    box-shadow: none;
  }

  ${is('disabled')`
    background-color: ${props => props.theme.disabled};
    color: ${props => props.theme.grey};
    cursor: not-allowed;

    ::-webkit-input-placeholder { /* WebKit, Blink, Edge */
      color: ${props => props.theme.grey};
    }

    ::-moz-placeholder { /* Mozilla Firefox 19+ */
      color: ${props => props.theme.grey};
    }

    :-ms-input-placeholder { /* Internet Explorer 10-11 */
      color: ${props => props.theme.grey};
    }
  `};

  &:disabled {
    background-color: ${props => props.theme.disabled};
    color: ${props => props.theme.grey};
    cursor: not-allowed;

    ::-webkit-input-placeholder {
      /* WebKit, Blink, Edge */
      color: ${props => props.theme.textDisabled};
    }

    ::-moz-placeholder {
      /* Mozilla Firefox 19+ */
      color: ${props => props.theme.textDisabled};
    }

    :-ms-input-placeholder {
      /* Internet Explorer 10-11 */
      color: ${props => props.theme.textDisabled};
    }
  }

  ${is('small')`
    width: ${remcalc(120)};
  `};

  ${is('big')`
    width: ${remcalc(355)};
  `};

  ${is('monospace')`
    font-family: ${props => props.theme.monoFont.families};

      &:disabled {
        color: ${props => props.theme.text};

        ::-webkit-input-placeholder {
          color: ${props => props.theme.text};
        }

        ::-moz-placeholder {
          color: ${props => props.theme.text};
        }

        :-ms-input-placeholder {
          color: ${props => props.theme.text};
        }
      }
  `};

  ${is('fluid')`
    width: 100%;
  `};

  ${is('xSmall')`
    width: ${remcalc(80)}
  `};

  ${is('error')`
    border-color: ${props => props.theme.redDark}
  `};

  ${is('embedded')`
    border: none;
    border-bottom: ${remcalc(1)} solid ${props => props.theme.text};
    border-radius: 0;
    background: transparent;
    padding: 0;
    padding-right: ${remcalc(12)};
    display: inline;
    height: ${remcalc(24)};
    appearance: none;
    min-height: 0;
  `};

  ${is('warning')`
    border-color: ${props => props.theme.orangeDark}
  `};

  ${is('wrapped')`
    margin: 0;
    border: none;
    width: ${remcalc(120)};
  `};

  ${is('success')`
    border-color: ${props => props.theme.greenDark}
  `};

  ${isNot('fluid')`
    max-width: ${remcalc(355)};
  `};

  ${is('width')`
    width: ${props => props.width};
    max-width: ${props => props.width};
  `};

  ${is('mono')`
    font-family: monospace;
  `};

  ${is('marginless')`
    margin: 0;
  `};

  ${isNot('value')`
    text-overflow: ellipsis;
  `};

  ${is('resize')`
    resize: ${props => props.resize};
  `};

  font-size: ${remcalc(15)};
  line-height: normal !important;

  font-style: normal;
  font-stretch: normal;

  appearance: none;
  outline: 0;

  &:focus {
    border-color: ${props => props.theme.primary};
    outline: 0;
  }
`;

const BaseInput = Component => ({ resize, onBlur, type, ...props }) => {
  const render = value => {
    const _value = value || {};
    const { input = {}, meta = {}, id = '' } = _value;

    const hasError = Boolean(props.error || _value.error || meta.error);
    const hasWarning = Boolean(props.warning || _value.warning || meta.warning);
    const hasSuccess = Boolean(props.success || _value.success || meta.success);

    const textarea = type === 'textarea';
    const marginless = Boolean(props.marginless);
    const fluid = Boolean(props.fluid);
    const mono = Boolean(props.mono);

    return (
      <Component
        {...props}
        {...input}
        onBlur={onBlur}
        id={id}
        error={hasError}
        warning={hasWarning}
        success={hasSuccess}
        fluid={fluid}
        marginless={marginless}
        mono={mono}
        resize={textarea ? resize : null}
        textarea={textarea}
      />
    );
  };

  return <Subscriber channel="input-group">{render}</Subscriber>;
};

BaseInput.propTypes = {
  error: PropTypes.bool,
  warning: PropTypes.bool
};

export default BaseInput;

export const Stylable = Component => {
  const stylable =
    typeof Component === 'string' ? styled[Component] : styled(Component);

  return stylable`
    ${style}
  `;
};
