// eslint-disable-next-line no-unused-vars
import _ from 'react-select/dist/react-select.css';

import Select from 'react-select';
import { rndId } from '../../shared/functions';
import { Baseline } from '../../shared/composers';
import { colors } from '../../shared/constants';
import styled from 'styled-components';
import React from 'react';

const StyledLabel = styled.div`
  color: ${colors.brandSecondaryColor};
`;

const SelectCustom = ({
  async,
  autoFocus,
  children,
  className,
  disabled,
  form,
  id = rndId(),
  isLoading,
  label,
  multi = false,
  name,
  onChange,
  options,
  required = false,
  style,
  value = ''
}) => (
  <div style={style}>
    <StyledLabel>
      {label}
    </StyledLabel>
    <Select
      autofocus
      className={className}
      disabled={disabled}
      loadOptions={async ? options : ''}
      multi={multi}
      name={name}
      onChange={onChange}
      options={!async ? options : ''}
      value={value}
    />
  </div>
);

SelectCustom.propTypes = {
  async: React.PropTypes.bool,
  autoFocus: React.PropTypes.bool,
  children: React.PropTypes.node,
  className: React.PropTypes.string,
  disabled: React.PropTypes.bool,
  form: React.PropTypes.string,
  id: React.PropTypes.string,
  isLoading: React.PropTypes.bool,
  label: React.PropTypes.string,
  multi: React.PropTypes.bool,
  name: React.PropTypes.string,
  onChange: React.PropTypes.func,
  options: React.PropTypes.array,
  required: React.PropTypes.bool,
  style: React.PropTypes.object,
  value: React.PropTypes.string
};

export default Baseline(
  SelectCustom
);
