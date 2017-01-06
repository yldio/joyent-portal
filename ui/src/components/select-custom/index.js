const fns = require('../../shared/functions');
const constants = require('../../shared/constants');
const React = require('react');
const Styled = require('styled-components');

const Select = require('react-select');

require('react-select/dist/react-select.css');

const {
  rndId,
} = fns;

const {
  colors
} = constants;

const {
  default: styled
} = Styled;

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
  value = ''
}) => {

  return (
    <div>
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
};

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
  value: React.PropTypes.string
};

module.exports = SelectCustom;
