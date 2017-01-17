const React = require('react');
const ReactIntl = require('react-intl');
const Styled = require('styled-components');

const constants = require('@ui/shared/constants');
const Close = require('@ui/components/close');
const fns = require('@ui/shared/functions');
const Li = require('@ui/components/horizontal-list/li');
const Modal = require('@ui/components/modal');
const PropTypes = require('@root/prop-types');
const Ul = require('@ui/components/horizontal-list/ul');

const {
  FormattedMessage
} = ReactIntl;

const {
  default: styled
} = Styled;

const {
  colors
} = constants;

const {
  remcalc
} = fns;

const H1 = styled.h1`
  font-size: ${remcalc(26)} !important;
  font-weight: 600;
  font-style: normal;
  font-stretch: normal;
  color: ${colors.brandSecondaryColor};
  margin: ${remcalc(24)} auto ${remcalc(9)} ${remcalc(24)} !important;
`;

const H3 = styled.h3`
  font-size: ${remcalc(16)} !important;
  font-weight: 600;
  font-style: normal;
  font-stretch: normal;
  color: ${colors.brandSecondaryColor};
  margin: ${remcalc(0)} auto ${remcalc(26)} ${remcalc(24)} !important;
`;

const Header = styled.header`
  overflow: hidden;
  background: ${colors.brandPrimaryColor};
  border-bottom: solid ${remcalc(1)} ${colors.borderSecondary};
`;

const StyledModal = styled(Modal)`
  background: ${colors.brandInactive} !important;
  box-shadow: 0 ${remcalc(2)} 0 0 rgba(0, 0, 0, 0.05);
  padding: 0 !important;
`;

const View = styled.div`
  margin: ${remcalc(18)} ${remcalc(24)} ${remcalc(49)} ${remcalc(24)};
  height: 100%;
`;

const Monitors = ({
  active = false,
  children,
  handleDismiss = () => null,
  metricType = {},
  page = 'create',
  submit = () => null,
  togglePage = () => null
}) => {
  const links = ['create', 'manage'].map((name) => {
    const id = `monitors.${name}`;
    const className = page === name ? 'active' : '';
    const onClick = (ev) => togglePage(name);
    const href = `#${name}`;

    return (
      <Li key={name}>
        <a
          className={className}
          href={href}
          onClick={onClick}
        >
          <FormattedMessage id={id} />
        </a>
      </Li>
    );
  });

  return (
    <StyledModal active={!!active} onDismiss={handleDismiss}>
      <Header>
        <H1>
          <FormattedMessage id='settings' />
        </H1>
        <H3>for {metricType.name}</H3>
      </Header>
      <View>
        <Ul>
          {links}
        </Ul>
        {children}
      </View>
      <Close onClick={handleDismiss} />
    </StyledModal>
  );
};

Monitors.propTypes = {
  active: React.PropTypes.string,
  children: React.PropTypes.node,
  handleDismiss: React.PropTypes.func.isRequired,
  metricType: PropTypes.metricType,
  page: React.PropTypes.string,
  submit: React.PropTypes.func.isRequired,
  togglePage: React.PropTypes.func.isRequired
};

module.exports = Monitors;
