const constants = require('../../shared/constants');
const fns = require('../../shared/functions');
const match = require('../../shared/match');
const React = require('react');
const Styled = require('styled-components');

const {
  colors
} = constants;

const {
  remcalc
} = fns;

const {
  prop: matchProp
} = match;

const {
  default: styled
} = Styled;

const background = matchProp({
  warning: colors.warningLight,
  alert: colors.alertLight,
}, 'transparent');

const border = matchProp({
  warning: colors.warning,
  alert: 'red',
}, 'none');

const StyledNotification = styled.div`
  border-radius: 4px;
  box-shadow: 0 2px 0 0 rgba(0, 0, 0, 0.05);
  display: inline-block;
  height: 100%;

  background-color: ${background('type')};
  border: ${border('type')};
`;

const StyledContent = styled.div`
  float: left;
  padding: ${remcalc(20)};
`;

const Notificaton = ({
  children,
  className,
  style,
  type = ''
}) => {
  return (
    <StyledNotification
      className={className}
      style={style}
      type={type}
    >
      <StyledContent>
        {children}
      </StyledContent>
    </StyledNotification>
  );
};

Notificaton.propTypes = {
  children: React.PropTypes.object,
  className: React.PropTypes.str,
  style: React.PropTypes.object,
  type: React.PropTypes.str
};

module.exports = Notificaton;
