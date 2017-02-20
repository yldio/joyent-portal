import React from 'react';
import InstanceItem from '@components/instance-item';
import PropTypes from '@root/prop-types';

const InstanceList = ({
  instances = [],
  toggleCollapsed = () => null
}) => {
  const onClick = (uuid) => () =>
    toggleCollapsed(uuid);

  const instanceList = instances.map((instance) => (
    <InstanceItem
      instance={instance}
      key={instance.uuid}
      toggleCollapsed={onClick(instance.uuid)}
    />
  ));

  return (
    <div>
      {instanceList}
    </div>
  );
};

InstanceList.propTypes = {
  instances: React.PropTypes.arrayOf(PropTypes.instance),
  toggleCollapsed: React.PropTypes.func
};

export default InstanceList;
