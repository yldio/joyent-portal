const React = require('react');
const constants = require('../../shared/constants');
const Styled = require('styled-components');

const {
  boxes
} = constants;

const {
  default: styled,
} = Styled;

const StyledInput = styled.input`
  display: none;
  visibility: hidden;

  &:checked {
    & ~ .content {
      border: ${boxes.border.checked};
    }
  }

  &:disabled {
    & ~ .content {
      cursor: not-allowed;
      filter: grayscale(80%);
      opacity: 0.4;
    }
  }
`;

const StyledContent = styled.div`
  border: ${boxes.border.unchecked};
  border-radius: 4px;
  cursor: pointer;
  padding: remcalc(36);

  & img {
    max-width: 100%;
  }
`;

const Widget = ({
  checked = false,
  children,
  className,
  disabled = false,
  name,
  selectable = 'single',
  style,
  value = name
}) => {
  const type = selectable === 'single' ? 'radio' : 'checkbox';

  return (
    <label className={className} htmlFor={value}>
      <StyledInput
        checked={checked}
        disabled={disabled}
        id={value}
        name={name}
        type={type}
        value={value}
      />
      <StyledContent>
        {children}
      </StyledContent>
    </label>
  );
};

Widget.propTypes = {
  checked: React.PropTypes.bool,
  children: React.PropTypes.object,
  className: React.PropTypes.string,
  disabled: React.PropTypes.bool,
  name: React.PropTypes.string,
  selectable: React.PropTypes.string,
  style: React.PropTypes.object,
  value: React.PropTypes.string
};

module.exports = Widget;
