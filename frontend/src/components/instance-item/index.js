import React from 'react';

import MetricsOutlet from '@components/metrics-outlet';
import PropTypes from '@root/prop-types';

import {
  ListItem,
  ListItemView,
  ListItemMeta,
  ListItemTitle,
  ListItemOptions
} from '@ui/components/list';

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

export default InstanceItem;
