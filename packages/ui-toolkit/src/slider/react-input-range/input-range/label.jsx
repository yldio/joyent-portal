import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import remcalc from 'remcalc';

import theme from '../../../theme';

const Span = styled.span`
  font-size: ${remcalc(13)};
  position: absolute;
  top: ${remcalc(14)};
  right: ${props => (props.type === 'max' ? '1px' : 'auto')};
  color: ${props => (props.greyed ? theme.grey : theme.secondary)};
`;

/**
 * @ignore
 * @param {Object} props
 * @param {InputRangeClassNames} props.classNames
 * @param {Function} props.formatLabel
 * @param {string} props.type
 */
export default function Label(props) {
  const labelValue = props.formatLabel
    ? props.formatLabel(props.children, props.type)
    : props.children;

  return (
    <Span greyed={props.greyed} type={props.type}>
      {labelValue}
    </Span>
  );
}

/**
 * @type {Object}
 * @property {Function} children
 * @property {Function} classNames
 * @property {Function} formatLabel
 * @property {Function} type
 */
Label.propTypes = {
  children: PropTypes.node.isRequired,
  classNames: PropTypes.objectOf(PropTypes.string),
  formatLabel: PropTypes.func,
  type: PropTypes.string,
  greyed: PropTypes.bool
};
