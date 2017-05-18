import { Subscriber } from 'react-broadcast';
import { is } from '../../shared/functions';
import { Baseline } from '../../shared/composers';
import { breakpoints, colors } from '../../shared/constants';
import styled from 'styled-components';
import Label from '../label';
import React from 'react';

const StyledLabel = styled(Label)`
  ${breakpoints.medium`
    text-align: right;
  `};

  ${is('right')`
    float: right;
  `};

  ${is('error')`
    color: ${colors.inputError};
  `};

  ${is('warning')`
    color: ${colors.inputWarning};
  `};

  ${is('success')`
    color: ${colors.base.green};
  `};
`;

const Meta = (props) => {
  const render = (value) => {
    const {
      meta = {}
    } = value;

    const msg = (
      props.children ||
      props.error ||
      props.warning ||
      props.success ||
      meta.error ||
      meta.warning ||
      meta.success ||
      value.error ||
      value.warning ||
      value.success
    );

    const hasError = !!(
      props.error ||
      meta.error ||
      value.error
    );

    const hasWarning = !!(
      props.warning ||
      meta.warning ||
      value.warning
    );

    const hasSuccess = !!(
      props.success ||
      meta.success ||
      value.success
    );

    const isRight = !props.left;

    return (
      <StyledLabel
        {...meta}
        {...props}
        error={hasError}
        warning={hasWarning}
        success={hasSuccess}
        right={isRight}
      >
        {msg}
      </StyledLabel>
    );
  };

  return (
    <Subscriber channel='input-group'>
      {render}
    </Subscriber>
  );
};

Meta.propTypes = {
  children: React.PropTypes.node,
  error: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.bool
  ]),
  left: React.PropTypes.bool,
  success: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.bool
  ]),
  warning: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.bool
  ])
};

export default Baseline(
  Meta
);
