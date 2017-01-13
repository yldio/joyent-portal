const React = require('react');

const MetricsOutlet = require('@components/metrics-outlet');
const PropTypes = require('@root/prop-types');
const List = require('@ui/components/list');

const {
  ListItem,
  ListItemView,
  ListItemMeta,
  ListItemTitle,
  ListItemOptions
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
      <MetricsOutlet datasets={instance.metrics} />
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