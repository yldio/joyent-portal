const React = require('react');
const ReactRedux = require('react-redux');

const actions = require('@state/actions');
const EmptyInstances = require('@components/empty/instances');
const PropTypes = require('@root/prop-types');
const InstanceList = require('@components/instance-list');
const selectors = require('@state/selectors');

const {
  toggleInstanceCollapsed
} = actions;

const {
  connect
} = ReactRedux;

const {
  instancesByServiceIdSelector
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
    <div>
      {empty}
      <InstanceList
        instances={instances}
        toggleCollapsed={toggleCollapsed}
      />
    </div>
  );
};

Instances.propTypes = {
  instances: React.PropTypes.arrayOf(PropTypes.instance),
  toggleCollapsed: React.PropTypes.func
};

const mapStateToProps = (state, {
  match = {}
}) => ({
  instances: instancesByServiceIdSelector(match.params.serviceId)(state)
});

const mapDispatchToProps = (dispatch) => ({
  toggleCollapsed: (uuid) => dispatch(toggleInstanceCollapsed(uuid))
});

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(Instances);
