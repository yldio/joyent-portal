const fns = require('../../shared/functions');
const composers = require('../../shared/composers');
const React = require('react');
const Styled = require('styled-components');

const {
  rndId,
  remcalc
} = fns;

const {
  pseudoEl
} = composers;

const {
  default: styled
} = Styled;

// TODO: this should be a constant
const StyledLabel = styled.div`
  color: #464646;
`;

const SelectWrapper = styled.div`
  position: relative;
  display: inline-block;

  &:after {
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 5px solid black;

    ${pseudoEl({
      top: '25px',
      right: '20px'
    })}
  }
`;


const StyledSelect = styled.select`
  font-size:16px;
  min-width: ${remcalc(288)};
  min-height: ${remcalc(54)};
  border-radius: 4px;
  padding-left: ${remcalc(20)};
  background-color: #FFFFFF;
  box-shadow: inset 0 3px 0 0 rgba(0, 0, 0, 0.05);
  border: solid 1px #D8D8D8;
  -webkit-appearance: none;

  &:before {
    ${pseudoEl()}
  }

  /* select[multiple] is valid CSS syntax - not added to lint library yet */
  /* stylelint-disable */
  &[multiple] {
  /* stylelint-enable */
    padding-left: 0;
    padding-right: 0;

    & option {
      padding-left: ${remcalc(15)};
      padding-right: ${remcalc(15)};
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

      <SelectWrapper>
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
      </SelectWrapper>
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
