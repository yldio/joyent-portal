import React from 'react';
import PropTypes from 'prop-types';

import {
  ListItem,
  ListItemView,
  ListItemMeta,
  ListItemTitle,
  ListItemOptions
} from '@ui/components/list';

const InstanceListItem = ({
  instance = {},
  onOptionsClick = () => null,
  toggleCollapsed = () => null
}) => (
  <ListItem collapsed={true} key={instance.uuid} >
    <ListItemView>
      <ListItemMeta onClick={toggleCollapsed}>
        <ListItemTitle>{instance.name}</ListItemTitle>
      </ListItemMeta>
    </ListItemView>
    <ListItemOptions onClick={onOptionsClick} />
  </ListItem>
);

InstanceListItem.propTypes = {
  instance: PropTypes.object,
  onOptionsClick: React.PropTypes.func,
  toggleCollapsed: React.PropTypes.func
};

export default InstanceListItem;
