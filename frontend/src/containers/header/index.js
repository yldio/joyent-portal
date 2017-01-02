const React = require('react');
const ReactRedux = require('react-redux');

const selectors = require('@state/selectors');
const actions = require('@state/actions');
const Header = require('@components/header');
const PropTypes = require('@root/prop-types');

const {
  connect
} = ReactRedux;

const {
  accountSelector,
  accountUISelector
} = selectors;

const {
  toggleHeaderTooltip
} = actions;

const Component = ({
  account = {},
  tooltip = false,
  handleToggle
}) => (
  <Header
    account={account}
    tooltip={tooltip}
    handleToggle={handleToggle}
  />
);

Component.propTypes = {
  account: PropTypes.account,
  tooltip: React.PropTypes.bool,
  handleToggle: React.PropTypes.func
};

const mapStateToProps = (state, ownProps) => ({
  account: accountSelector(state),
  ...accountUISelector(state)
});

const mapDispatchToProps = (dispatch) => ({
  handleToggle: () => dispatch(toggleHeaderTooltip())
});

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
