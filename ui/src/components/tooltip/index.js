// TODO: use a checkbox

const React = require('react');
const composers = require('../../shared/composers');
const fns = require('../../shared/functions');
const constants = require('../../shared/constants');
const Styled = require('styled-components');

const {
  baseBox,
  pseudoEl,
} = composers;

const {
  remcalc
} = fns;

const {
  default: styled
} = Styled;

const {
  colors
} = constants;

const ItemPadder = 9;
const WrapperPadder = 24;
const ulPadder = `${WrapperPadder - ItemPadder} 0`;


const StyledList = styled.ul`
  position: relative;
  background: #fff;
  color: #646464;
  display: inline-block;
  font-family: sans-serif;
  list-style-type: none;
  margin: 0;
  padding: ${remcalc(ulPadder)};
  min-width: ${remcalc(200)};
  
  ${props => props.style}

  ${baseBox()}

  & > * {

    padding: ${remcalc(ItemPadder)} ${remcalc(WrapperPadder)};

    &:hover {
      background: ${colors.borderSecondaryDarkest};
    }
  }

  &:after, &:before {
    border: solid transparent;
    height: 0;
    width: 0;

    ${ props => pseudoEl(props.arrowPosition) }
  }

  &:after {
    border-color: rgba(255, 255, 255, 0);
    border-bottom-color: #fff;
    border-width: ${remcalc(10)};
    margin-left: ${remcalc(-10)};
  }
  &:before {
    border-color: rgba(216, 216, 216, 0);
    border-bottom-color: ${colors.greyDark};
    border-width: ${remcalc(12)};
    margin-left: ${remcalc(-12)};
  }
`;
module.exports = ({
  children,
  className,
  style,
  arrowPosition = {
    bottom: '100%',
    left: '10%'
  }
}) => {
  return (
    <StyledList
      arrowPosition={arrowPosition}
      className={className}
      style={style}
    >
      {children}
    </StyledList>
  );
};

module.exports.propTypes = {
  arrowPosition: React.PropTypes.object,
  children: React.PropTypes.node,
  className: React.PropTypes.string,
  style: React.PropTypes.object
};
