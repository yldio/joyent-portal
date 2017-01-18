const React = require('react');
const ReduxForm = require('redux-form');
const ReactRedux = require('react-redux');

const actions = require('@state/actions');
const CreateMonitor = require('@components/create-monitor');
const ManageMonitor = require('@components/manage-monitor');
const Monitors = require('@components/monitors');
const selectors = require('@state/selectors');

const {
  reduxForm
} = ReduxForm;

const {
  connect
} = ReactRedux;

const {
  metricTypeByUuidSelector
} = selectors;

const {
  toggleMonitorView,
  switchMonitorViewPage
} = actions;

const ConnectedCreateMonitor = reduxForm({
  form: 'create-monitor'
})(CreateMonitor);
// const ConnectedCreateMonitor = reduxForm()(CreateMonitor);

const MetricMonitors = (props) => {
  const {
    page
  } = props;

  const views = {
    create: () => (
      <ConnectedCreateMonitor />
    ),
    manage: () => (
      <ManageMonitor />
    )
  };

  return (
    <Monitors {...props}>
      {views[page]()}
    </Monitors>
  );
};

MetricMonitors.propTypes = {
  page: React.PropTypes.string
};

const mapStateToProps = (state) => ({
  metricType: metricTypeByUuidSelector(state.monitors.ui.active)(state),
  active: state.monitors.ui.active,
  page: state.monitors.ui.page
});

const mapDispatchToProps = (dispatch) => ({
  handleDismiss: () => dispatch(toggleMonitorView()),
  togglePage: (newPage) => dispatch(switchMonitorViewPage(newPage))
});

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(MetricMonitors);
