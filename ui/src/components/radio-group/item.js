const React = require('react');
// const composers = require('../../shared/composers');
const fns = require('../../shared/functions');
const Styled = require('styled-components');
const constants = require('../../shared/constants');

// const {
//   verticallyAlignCenter
// } = composers;

const {
  remcalc
} = fns;

const {
  boxes
} = constants;

const {
  default: styled
} = Styled;

const RadioItem = styled.div`
  background: #FFFFFF;
  border: ${boxes.border.unchecked};
  cursor: pointer;
  flaot: left;
  margin-bottom: ${remcalc(15)};
  padding: ${remcalc(25)};
  outline: none;

  &:last-child {
    margin-bottom: initial;
  }

  &[aria-checked="true"] {
    border: ${boxes.border.checked};
    box-shadow: ${boxes.borderRadius};
  }

  &.disabled {
    cursor: default;
  }
`;


const Item = ({
  children,
  checked = false,
  itemContent = '',
  disabled = false,
  onClick,
  tabIndex
}) => {
  return (
    <RadioItem
      aria-checked={checked}
      aria-disabled={disabled}
      onClick={onClick}
      role='radio'
      tabIndex={tabIndex}
    >
      {children}
    </RadioItem>
  );
};

Item.propTypes = {
  checked: React.PropTypes.bool,
  children: React.PropTypes.node,
  disabled: React.PropTypes.bool,
  itemContent: React.PropTypes.node,
  onClick: React.PropTypes.func,
  tabIndex: React.PropTypes.number
};

module.exports = Item;
