const React = require('react');

const DatasetsRow = require('@components/metrics-row');
const PropTypes = require('@root/prop-types');
const List = require('@ui/components/list');

const {
  ListItem,
  ListItemView,
  ListItemMeta,
  ListItemTitle,
  ListItemOptions,
  ListItemOutlet
} = List;

const InstanceItem = ({
  instance = {},
  toggleCollapsed = () => null
}) => (
  <ListItem collapsed={!instance.collapsed} key={instance.uuid} >
    <ListItemView>
      <ListItemMeta onClick={toggleCollapsed}>
        <ListItemTitle>{instance.name}</ListItemTitle>
      </ListItemMeta>
      <ListItemOutlet>
        <DatasetsRow datasets={instance.metrics} />
      </ListItemOutlet>
    </ListItemView>
    <ListItemOptions>
      …
    </ListItemOptions>
  </ListItem>
);

InstanceItem.propTypes = {
  instance: PropTypes.instance,
  toggleCollapsed: React.PropTypes.func
};

module.exports = InstanceItem;