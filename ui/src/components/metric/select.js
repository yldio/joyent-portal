const fns = require('../../shared/functions');
const composers = require('../../shared/composers');
const constants = require('../../shared/constants');
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
  colors
} = constants;

const {
  default: styled
} = Styled;

const SelectWrapper = styled.div`
  position: relative;
  display: flex;
  text-align: right !important;

  &:after {
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid ${colors.brandPrimaryColor};

    ${pseudoEl({
      top: '28px',
      right: '18px'
    })}
  }
`;

const StyledSelect = styled.select`
  padding: ${remcalc(18)} ${remcalc(24)};
  min-width: ${remcalc(154)};
  font-size:16px;
  text-align: right !important;
  border-radius: 0;
  color: ${colors.brandPrimaryColor};
  background-color: ${colors.brandPrimaryDark};
  border: none;
  border-left: solid ${remcalc(1)} ${colors.brandPrimaryDarkest};
  -webkit-appearance: none;
  cursor: pointer;
`;

const Select = ({
  autoFocus,
  children,
  disabled,
  form,
  id = rndId(),
  name,
  onChange,
  required,
  selected,
  value
}) => {
  return (
    <SelectWrapper>
      <StyledSelect
        autoFocus={autoFocus}
        disabled={disabled}
        form={form}
        id={id}
        name={name}
        onChange={onChange}
        required={required}
        selected={selected}
        value={value}
      >
        {children}
      </StyledSelect>
    </SelectWrapper>
  );
};

Select.propTypes = {
  autoFocus: React.PropTypes.bool,
  children: React.PropTypes.node,
  disabled: React.PropTypes.bool,
  form: React.PropTypes.string,
  id: React.PropTypes.string,
  name: React.PropTypes.string,
  onChange: React.PropTypes.func,
  required: React.PropTypes.bool,
  selected: React.PropTypes.bool,
  value: React.PropTypes.string
};

module.exports = Select;
