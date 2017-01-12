const React = require('react');
const constants = require('../../shared/constants');
const fns = require('../../shared/functions');
const Styled = require('styled-components');

const {
  boxes
} = constants;

const {
  rndId,
  remcalc
} = fns;

const {
  default: styled,
} = Styled;

const classNames = {
  content: rndId()
};

const StyledInput = styled.input`
  display: none;
  visibility: hidden;

  &:checked {
    & ~ .${classNames.content} {
      border: ${boxes.border.checked};
    }
  }

  &:disabled {
    & ~ .${classNames.content} {
      cursor: not-allowed;
      filter: grayscale(80%);
      opacity: 0.4;
    }
  }
`;

const StyledContent = styled.div`
  border: ${boxes.border.unchecked};
  border-radius: ${remcalc(4)};
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
  id,
  name,
  selectable = 'single',
  style,
  value = name
}) => {
  const type = selectable === 'single' ? 'radio' : 'checkbox';

  return (
    <label
      className={className}
      htmlFor={value}
      id={id}
    >
      <StyledInput
        checked={checked}
        disabled={disabled}
        id={value}
        name={name}
        type={type}
        value={value}
      />
      <StyledContent className={classNames.content}>
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
  id: React.PropTypes.string,
  name: React.PropTypes.string,
  selectable: React.PropTypes.string,
  style: React.PropTypes.object,
  value: React.PropTypes.string
};

module.exports = Widget;
