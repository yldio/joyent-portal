import React, { Component } from 'react';
import { Broadcast } from 'joy-react-broadcast';
import PropTypes from 'prop-types';
import rndId from 'rnd-id';
import styled from 'styled-components';
import is from 'styled-is';

import Fieldset from './fieldset';
import Baseline from '../baseline';

const Noop = ({ children }) => children;

const Wrapper = styled(Fieldset)`
  ${is('center')`
    align-items: center;
  `};

  ${is('flex')`
    display: flex;
  `};
`;

class FormGroup extends Component {
  constructor(props) {
    super(props);

    this.renderGroup = this.renderGroup.bind(this);
  }

  renderGroup(inputProps) {
    const { className, style, children, fluid = false, ...rest } = this.props;

    const value = {
      id: rndId(),
      ...rest,
      ...inputProps
    };

    return (
      <Wrapper className={className} style={style} fluid={fluid} {...rest}>
        <Broadcast channel="input-group" value={value}>
          <Noop>{children}</Noop>
        </Broadcast>
      </Wrapper>
    );
  }

  render() {
    const { name = rndId(), field = null, children, ...rest } = this.props;

    if (!field) {
      return this.renderGroup({});
    }

    return React.createElement(
      field,
      { ...rest, name, component: this.renderGroup },
      children
    );
  }
}

FormGroup.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  defaultValue: PropTypes.string,
  name: PropTypes.string,
  normalize: PropTypes.func,
  field: PropTypes.node,
  style: PropTypes.object
};

export default Baseline(FormGroup);
