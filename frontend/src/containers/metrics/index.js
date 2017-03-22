import React from 'react';
import { connect } from 'react-redux';

import { toggleMonitorView } from '@state/actions';
// import AddMetrics from '@root/components/metric-charts/add-metrics';
// import Button from '@ui/components/button';
// import Column from '@ui/components/column';
import MetricCharts from '@root/components/metric-charts';
// import Monitors from './monitors';
import PropTypes from '@root/prop-types';
// import Row from '@ui/components/row';

const Metrics = ({
  addMetric,
  datasets,
  metricTypes,
  metricTypeUuid = '',
  metricDurationChange,
  service,
  toggleMonitorView = () => null
}) => {

  const onMonitorsClick = (ev) => toggleMonitorView(metricTypeUuid);
  const onRemoveMetric = (ev) => null;

  return (
    <MetricCharts
      datasets={datasets}
      onDurationChange={metricDurationChange}
      onRemoveMetric={onRemoveMetric}
      onSettingsClick={onMonitorsClick}
    />
  );

  /*return (
    <div>
      <Row reverse>
        <Column>
          <Button onClick={onMonitorsClick}>Monitors</Button>
        </Column>
      </Row>
      <Monitors />
      <MetricCharts
        datasets={datasets}
        onDurationChange={metricDurationChange}
        onRemoveMetric={onRemoveMetric}
        onSettingsClick={onMonitorsClick}
      />
      <AddMetrics
        datasets={datasets}
        metricTypes={metricTypes}
        onAddMetric={addMetric}
      />
    </div>
  );*/
};

Metrics.propTypes = {
  addMetric: React.PropTypes.func.isRequired,
  datasets: React.PropTypes.arrayOf(PropTypes.dataset),
  metricDurationChange: React.PropTypes.func.isRequired,
  metricTypeUuid: React.PropTypes.string,
  metricTypes: React.PropTypes.arrayOf(PropTypes.metric),
  service: PropTypes.service,
  toggleMonitorView: React.PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  // hardcoded now, but should be dynamic
  // actually, the use for this prop is going to disapear
  metricTypeUuid: 'dca08514-72e5-46ce-ad91-e68b3b0914d4'
});

const mapDispatchToProps = (dispatch) => ({
  toggleMonitorView: (metricTypeUuid) =>
    dispatch(toggleMonitorView(metricTypeUuid))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Metrics);
