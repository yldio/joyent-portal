import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// import forceArray from 'force-array';

// import ItemMetricGroup from '@components/item-metric-group';
import { Link } from '@ui/components/anchor';
import {
  DataCentersIcon,
  HealthyIcon,
  InstancesMultipleIcon
} from '@ui/components/icons';

import {
  ListItem,
  ListItemView,
  ListItemMeta,
  ListItemTitle,
  ListItemSubTitle,
  ListItemDescription,
  ListItemGroupView,
  ListItemOptions,
  ListItemHeader,
  ListItemInfo
} from '@ui/components/list';

const TitleInnerContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const ServiceListItem = ({
  // onQuickActions=() => {},
  deploymentGroup = '',
  service = {}
}) => {
  const isChild = !!service.parent;

  const children = service.children ?
    service.children.map((service) => (
      <ServiceListItem
        key={service.uuid}
        deploymentGroup={deploymentGroup}
        service={service}
      />
    )) : null;

  const to = `/deployment-groups/${deploymentGroup}/services/${service.slug}`;

  const title = service.parent ? (
    <ListItemTitle>
      {service.name}
    </ListItemTitle>
  ) : (
    <ListItemTitle>
      <TitleInnerContainer>
        <Link secondary to={to}>
          {service.name}
        </Link>
      </TitleInnerContainer>
    </ListItemTitle>
  );

  const subtitle = (
    <ListItemSubTitle>{service.instances} instances</ListItemSubTitle>
  );

  const onOptionsClick = (evt) => {
    // onQuickActions(evt, service.uuid);
  };

  const header = isChild ? null : (
    <ListItemHeader>
      <ListItemMeta>
        {title}
        <ListItemDescription>
          <ListItemInfo
            icon={<InstancesMultipleIcon />}
            iconPosition='top'
            label={`${service.instances} ${service.instances > 1 ?
              'instances' : 'instance' }`}
          />
          { /* <ListItemInfo
            icon={<DataCentersIcon />}
            label={service.datacenters[0].id}
          />*/ }
        </ListItemDescription>
      </ListItemMeta>
      <ListItemOptions onClick={onOptionsClick} />
    </ListItemHeader>
  );

  const view = children ? (
    <ListItemGroupView>
      {children}
    </ListItemGroupView>
  ) : (
    <ListItemView>
      <ListItemMeta>
        {isChild && title}
        {isChild && subtitle}
        <ListItemDescription>
          <ListItemInfo
            icon={<HealthyIcon />}
            label='Healthy'
          />
        </ListItemDescription>
      </ListItemMeta>
      { /* <ItemMetricGroup
        datasets={service.metrics}
      /> */ }
    </ListItemView>
  );

  return (
    <ListItem
      collapsed={service.collapsed}
      flat={isChild}
      headed={!isChild}
      key={service.uuid}
      stacked={isChild && (service.instances > 1)}
    >
      {header}
      {view}
    </ListItem>
  );
};

ServiceListItem.propTypes = {
  // onQuickActions: React.PropTypes.func,
  deploymentGroup: React.PropTypes.string,
  service: PropTypes.object.isRequired // define better
};

export default ServiceListItem;
