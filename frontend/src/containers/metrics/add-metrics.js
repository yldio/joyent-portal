const React = require('react');
const ReactRedux = require('react-redux');
const PropTypes = require('@root/prop-types');
const AddMetric = require('@ui/components/add-metric');
const ReactIntl = require('react-intl');

const {
  connect
} = ReactRedux;

const {
  FormattedMessage
} = ReactIntl;

const {
  AddMetricButton,
  AddMetricDescription,
  AddMetricLink,
  AddMetricTile,
  AddMetricTitle
} = AddMetric;

// we need some props! But like what? We'll need :
// - metrics
// - what metrics we have
//    - we need to filter these by...
//      instance/service? Think service... no? Huh :|
// - and some other stuff
//    - like access to the reducer for when we add a thing
//      (by thing I mean metric)
const AddMetrics = ({
  metricTypes
}) => {

  const metricList = metricTypes.map((metric) => (
    <AddMetricTile key={metric}>
      <AddMetricTitle>
        <FormattedMessage id={`metrics.${metric}.title`} />
      </AddMetricTitle>
      <AddMetricDescription>
        <FormattedMessage id={`metrics.${metric}.description`} />
      </AddMetricDescription>
      <AddMetricLink href='http://somelink.com'>
        <FormattedMessage id={'metrics.add.link'} />
      </AddMetricLink>
      <AddMetricButton>
        <FormattedMessage id={'metrics.add.add-label'} />
      </AddMetricButton>
    </AddMetricTile>
  ));

  return (
    <div>
      {metricList}
    </div>
  );
};

AddMetrics.propTypes = {
  /* TODO - */
  metricTypes: PropTypes.metricTypes
};

const mapStateToProps = (state, {
  params = {}
}) => ({
  /* TODO - tidy up */
  metricTypes: state.metrics.ui.types
});

module.exports = connect(
  mapStateToProps
)(AddMetrics);
