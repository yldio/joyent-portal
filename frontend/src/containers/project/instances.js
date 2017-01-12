const React = require('react');
const ReactRedux = require('react-redux');

const actions = require('@state/actions');
const EmptyInstances = require('@components/empty/instances');
const PropTypes = require('@root/prop-types');
const Section = require('./section');
const InstanceList = require('@components/instance-list');
const selectors = require('@state/selectors');

const {
  toggleInstanceCollapsed
} = actions;

const {
  connect
} = ReactRedux;

const {
  instancesByProjectIdSelector
} = selectors;

const Instances = (props) => {
  const {
    instances = [],
    toggleCollapsed = () => null
  } = props;

  const empty = instances.length ? null : (
    <EmptyInstances />
  );

  return (
    <Section {...props}>
      {empty}
      <InstanceList
        instances={instances}
        toggleCollapsed={toggleCollapsed}
      />
    </Section>
  );
};

Instances.propTypes = {
  instances: React.PropTypes.arrayOf(PropTypes.instance),
  toggleCollapsed: React.PropTypes.func
};

const mapStateToProps = (state, {
  params = {}
}) => ({
  instances: instancesByProjectIdSelector(params.projectId)(state)
});

const mapDispatchToProps = (dispatch) => ({
  toggleCollapsed: (uuid) => dispatch(toggleInstanceCollapsed(uuid))
});

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(Instances);

