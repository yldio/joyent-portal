const ReactRedux = require('react-redux');

const selectors = require('@state/selectors');
const actions = require('@state/actions');
const Header = require('@components/header');

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
