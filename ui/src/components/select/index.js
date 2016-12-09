const fns = require('../../shared/functions');
const React = require('react');
const Styled = require('styled-components');

const {
  rndId
} = fns;

const {
  default: styled
} = Styled;

// TODO: this should be a constant
const StyledLabel = styled.div`
  color: #464646;
`;

const StyledSelect = styled.select`
  color: #464646;

  /* select[multiple] is valid CSS syntax - not added to lint library yet */
  /* stylelint-disable */
  &[multiple] {
  /* stylelint-enable */
    padding-left: 0;
    padding-right: 0;

    & :global option {
      padding-left: 15px;
      padding-right: 15px;
      width: 100%;
    }
  }
`;

const Select = ({
  autoFocus,
  children,
  className,
  disabled,
  form,
  id = rndId(),
  label,
  multiple,
  name,
  required,
  selected
}) => {
  return (
    <div className={className}>
      <StyledLabel htmlFor={id}>
        {label}
      </StyledLabel>
      <StyledSelect
        autoFocus={autoFocus}
        disabled={disabled}
        form={form}
        id={id}
        label={label}
        multiple={multiple}
        name={name}
        required={required}
        selected={selected}
      >
        {children}
      </StyledSelect>
    </div>
  );
};

Select.propTypes = {
  autoFocus: React.PropTypes.bool,
  children: React.PropTypes.node,
  className: React.PropTypes.string,
  disabled: React.PropTypes.bool,
  form: React.PropTypes.string,
  id: React.PropTypes.string,
  label: React.PropTypes.string,
  multiple: React.PropTypes.bool,
  name: React.PropTypes.string,
  required: React.PropTypes.bool,
  selected: React.PropTypes.bool
};

module.exports = Select;
