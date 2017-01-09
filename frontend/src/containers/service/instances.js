const React = require('react');
const ReactRedux = require('react-redux');

const EmptyInstances = require('@components/empty/instances');
const PropTypes = require('@root/prop-types');
const List = require('@ui/components/list');
const selectors = require('@state/selectors');

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
  ListItemOptions
} = List;

const Instances = ({
  instances = []
}) => {
  const empty = instances.length ? null : (
    <EmptyInstances />
  );

  const instanceList = instances.map((service) => (
    <ListItem collapsed key={service.uuid}>
      <ListItemView>
        <ListItemMeta>
          <ListItemTitle>{service.name}</ListItemTitle>
        </ListItemMeta>
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
  instances: React.PropTypes.arrayOf(PropTypes.instance)
};

const mapStateToProps = (state, {
  params = {}
}) => ({
  instances: instancesByServiceIdSelector(params.serviceId)(state)
});

module.exports = connect(
  mapStateToProps
)(Instances);
