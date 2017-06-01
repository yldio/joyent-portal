import { Subscriber } from 'react-broadcast';
import is from 'styled-is';
import Baseline from '../baseline';
import breakpoints from '../breakpoints';
import Label from '../label';
import PropTypes from 'prop-types';
import React from 'react';

const StyledLabel = Label.extend`
  ${breakpoints.medium`
    text-align: right;
  `};

  ${is('right')`
    float: right;
  `};

  ${is('error')`
    color: ${props => props.theme.red};
  `};

  ${is('warning')`
    color: ${props => props.theme.orange};
  `};

  ${is('success')`
    color: ${props => props.theme.green};
  `};
`;

const Meta = props => {
  const render = value => {
    const { meta = {} } = value;

    const msg =
      props.children ||
      props.error ||
      props.warning ||
      props.success ||
      meta.error ||
      meta.warning ||
      meta.success ||
      value.error ||
      value.warning ||
      value.success;

    const hasError = Boolean(props.error || meta.error || value.error);
    const hasWarning = Boolean(props.warning || meta.warning || value.warning);
    const hasSuccess = Boolean(props.success || meta.success || value.success);
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
    <Subscriber channel="input-group">
      {render}
    </Subscriber>
  );
};

Meta.propTypes = {
  children: PropTypes.node,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  left: PropTypes.bool,
  success: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  warning: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
};

export default Baseline(Meta);
