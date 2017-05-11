import React from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import { toggleMonitorView, switchMonitorViewPage } from '@state/actions';
import CreateMonitor from '@components/create-monitor';
import ManageMonitor from '@components/manage-monitor';
import Monitors from '@components/monitors';
import { metricTypeByUuidSelector } from '@state/selectors';

const CreateMonitorForm = reduxForm({
  form: 'create-monitor'
})(CreateMonitor);

const MetricMonitors = (props) => {
  const {
    page
  } = props;

  const views = {
    create: () => (
      <CreateMonitorForm />
    ),
    manage: () => (
      <ManageMonitor />
    )
  };

  const onSubmit = () => null;

  return (
    <Monitors submit={onSubmit} {...props}>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MetricMonitors);
