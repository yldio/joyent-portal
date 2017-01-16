const ReactRedux = require('react-redux');

const actions = require('@state/actions');
const Monitors = require('@components/monitors');
const selectors = require('@state/selectors');

const {
  connect
} = ReactRedux;

const {
  metricTypeByUuidSelector
} = selectors;

const {
  toggleMonitorView,
  switchMonitorViewPage,
  createMonitor
} = actions;

const mapStateToProps = (state) => ({
  metricType: metricTypeByUuidSelector(state.monitors.ui.active)(state),
  active: state.monitors.ui.active,
  page: state.monitors.ui.page
});

const mapDispatchToProps = (dispatch) => ({
  handleDismiss: () => dispatch(toggleMonitorView()),
  togglePage: (newPage) => dispatch(switchMonitorViewPage(newPage)),
  submit: (meta) => dispatch(createMonitor(meta))
});

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(Monitors);
