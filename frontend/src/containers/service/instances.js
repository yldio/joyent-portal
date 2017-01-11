const React = require('react');
const ReactRedux = require('react-redux');

const actions = require('@state/actions');
const EmptyInstances = require('@components/empty/instances');
const PropTypes = require('@root/prop-types');
const List = require('@ui/components/list');
const DatasetsRow = require('@components/metrics-row');
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

const {
  ListItem,
  ListItemView,
  ListItemMeta,
  ListItemTitle,
  ListItemOptions,
  ListItemOutlet
} = List;

const Instances = ({
  instances = [],
  toggleCollapsed = () => null
}) => {
  const onClick = (uuid) => () => toggleCollapsed(uuid);

  const empty = instances.length ? null : (
    <EmptyInstances />
  );

  const instanceList = instances.map((instance) => (
    <ListItem collapsed={!instance.collapsed} key={instance.uuid} >
      <ListItemView>
        <ListItemMeta onClick={onClick(instance.uuid)}>
          <ListItemTitle>{instance.name}</ListItemTitle>
        </ListItemMeta>
        <ListItemOutlet>
          <DatasetsRow metrics={instance.metrics} />
        </ListItemOutlet>
      </ListItemView>
      <ListItemOptions>
        …
      </ListItemOptions>
    </ListItem>
  ));

  return (
    <div>
      {empty}
      {instanceList}
    </div>
  );
};

Instances.propTypes = {
  instances: React.PropTypes.arrayOf(PropTypes.instance),
  toggleCollapsed: React.PropTypes.func
};

const mapStateToProps = (state, {
  params = {}
}) => ({
  instances: instancesByServiceIdSelector(params.serviceId)(state)
});

const mapDispatchToProps = (dispatch) => ({
  toggleCollapsed: (uuid) => dispatch(toggleInstanceCollapsed(uuid))
});

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(Instances);
