import React from 'react';
import PropTypes from 'prop-types';

import {
  Card,
  CardView,
  CardMeta,
  CardTitle,
  CardOptions
} from 'joyent-ui-toolkit';

const InstanceCard = ({
  instance = {},
  onOptionsClick = () => null,
  toggleCollapsed = () => null
}) => (
  <Card collapsed={true} key={instance.uuid}>
    <CardView>
      <CardMeta onClick={toggleCollapsed}>
        <CardTitle>{instance.name}</CardTitle>
      </CardMeta>
    </CardView>
    <CardOptions onClick={onOptionsClick} />
  </Card>
);

InstanceCard.propTypes = {
  instance: PropTypes.object,
  onOptionsClick: PropTypes.func,
  toggleCollapsed: PropTypes.func
};

export default InstanceCard;
