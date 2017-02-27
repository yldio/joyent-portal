import React from 'react';
import forceArray from 'force-array';

import { Link } from '@ui/components/anchor';
import MetricsOutlet from '@components/metrics-outlet';
import PropTypes from '@root/prop-types';

import {
  ListItem,
  ListItemView,
  ListItemMeta,
  ListItemTitle,
  ListItemSubTitle,
  ListItemDescription,
  ListItemGroupView,
  ListItemOptions,
  ListItemHeader
} from '@ui/components/list';

const ServiceItem = ({
  org = '',
  project = '',
  service = {}
}) => {
  const isChild = !!service.parent;

  const childs = forceArray(service.services).map((service) => (
    <ServiceItem
      key={service.uuid}
      org={org}
      project={project}
      service={service}
    />
  ));

  const to = `/${org}/projects/${project}/services/${service.id}`;

  const title = isChild ? (
    <ListItemTitle>{service.name}</ListItemTitle>
  ) : (
    <ListItemTitle>
      <Link secondary to={to}>
        {service.name}
      </Link>
    </ListItemTitle>
  );

  const subtitle = (
    <ListItemSubTitle>{service.instances} instances</ListItemSubTitle>
  );

  const description = (
    <ListItemDescription>Flags</ListItemDescription>
  );

  const header = isChild ? null : (
    <ListItemHeader>
      <ListItemMeta>
        {title}
        {subtitle}
        {description}
      </ListItemMeta>
      <ListItemOptions>…</ListItemOptions>
    </ListItemHeader>
  );

  const view = childs.length ? (
    <ListItemGroupView>
      {childs}
    </ListItemGroupView>
  ) : (
    <ListItemView>
      <ListItemMeta>
        {isChild && title}
        {isChild && subtitle}
        {description}
      </ListItemMeta>
      <MetricsOutlet datasets={service.metrics} />
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

ServiceItem.propTypes = {
  org: React.PropTypes.string,
  project: React.PropTypes.string,
  service: PropTypes.service
};

export default ServiceItem;
