const constants = require('../../shared/constants');
const composers = require('../../shared/composers');
const fns = require('../../shared/functions');
const React = require('react');
const Styled = require('styled-components');
const Close = require('../close');

const {
  colors
} = constants;

const {
  remcalc
} = fns;

const {
  default: styled
} = Styled;

const {
  baseBox,
  pseudoEl,
  Baseline
} = composers;

const decorationWidth = remcalc(108);

const StyledNotification = styled.div`
  display: inline-block;
  min-height: 100%;
  position: relative;
  width: 100%;

  ${baseBox(0)}

  &::before {
    background-color: ${props => colors[props.type] || colors.brandPrimary}
    width: ${decorationWidth};
    height: 100%;

    ${pseudoEl()}
  }
`;

const StyledContent = styled.div`
  float: left;
  padding: ${remcalc(18)} 20% ${remcalc(18)} ${remcalc(18)};
  margin-left: ${decorationWidth};
  width: 100%;
`;

const Notificaton = ({
  children,
  className,
  style,
  type,
  close
}) => {
  const renderClose = !close ? null : (
    <Close onClick={close} />
  );

  return (
    <StyledNotification
      className={className}
      style={style}
      type={type}
    >
      {renderClose}
      <StyledContent>
        {children}
      </StyledContent>
    </StyledNotification>
  );
};

Notificaton.propTypes = {
  children: React.PropTypes.object,
  className: React.PropTypes.str,
  close: React.PropTypes.func,
  style: React.PropTypes.object,
  type: React.PropTypes.string
};

module.exports = Baseline(
  Notificaton
);
