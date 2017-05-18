import React, { Component } from 'react';
import { Broadcast } from 'react-broadcast';
import { Field } from 'redux-form';
import Fieldset from './fieldset';
import Baseline from '../baseline';
import PropTypes from 'prop-types';
import rndId from 'rnd-id';

class FormGroup extends Component {
  constructor(props) {
    super(props);

    this.renderGroup = this.renderGroup.bind(this);
  }

  renderGroup(inputProps) {
    const { className, style, children, ...rest } = this.props;

    const value = {
      id: rndId(),
      ...rest,
      ...inputProps
    };

    return (
      <Fieldset className={className} style={style}>
        <Broadcast channel="input-group" value={value}>
          <div>
            {children}
          </div>
        </Broadcast>
      </Fieldset>
    );
  }

  render() {
    const {
      name = rndId(),
      defaultValue,
      normalize,
      reduxForm = false
    } = this.props;

    if (!reduxForm) {
      return this.renderGroup({});
    }

    return (
      <Field
        name={name}
        defaultValue={defaultValue}
        component={this.renderGroup}
        normalize={normalize}
      />
    );
  }
}

FormGroup.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  defaultValue: PropTypes.string,
  name: PropTypes.string,
  normalize: PropTypes.func,
  reduxForm: PropTypes.bool,
  style: PropTypes.object
};

export default Baseline(FormGroup);
