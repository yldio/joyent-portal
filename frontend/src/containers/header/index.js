import { connect } from 'react-redux';

import { accountSelector, accountUISelector } from '@state/selectors';
import { toggleHeaderTooltip } from '@state/actions';
import Header from '@components/header';

const mapStateToProps = (state, ownProps) => ({
  account: accountSelector(state),
  ...accountUISelector(state)
});

const mapDispatchToProps = (dispatch) => ({
  onHeaderToggle: (bool) => dispatch(toggleHeaderTooltip(bool))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
