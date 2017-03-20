import styled from 'styled-components';
import { Link } from '@ui/components/anchor';
import ItemMetricGroup from '@components/item-metric-group';
import { Checkbox, FormGroup } from '@ui/components/form';
import PropTypes from '@root/prop-types';
import forceArray from 'force-array';
import React from 'react';
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

const StyledFormGroup = styled(FormGroup)`
  width: auto;
`;

const TitleInnerContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const ServiceItem = ({
  onQuickActions=() => {},
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
    <ListItemTitle>
      {service.name}
    </ListItemTitle>
  ) : (
    <ListItemTitle>
      <TitleInnerContainer>
        <StyledFormGroup>
          <Checkbox />
        </StyledFormGroup>
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
    onQuickActions(evt, service.uuid);
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
          <ListItemInfo
            icon={<DataCentersIcon />}
            label={service.datacenters[0].id}
          />
        </ListItemDescription>
      </ListItemMeta>
      <ListItemOptions onClick={onOptionsClick} />
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
        <ListItemDescription>
          <ListItemInfo
            icon={<HealthyIcon />}
            label='Healthy'
          />
        </ListItemDescription>
      </ListItemMeta>
      <ItemMetricGroup
        datasets={service.metrics}
      />
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
  onQuickActions: React.PropTypes.func,
  org: React.PropTypes.string,
  project: React.PropTypes.string,
  service: PropTypes.service
};

export default ServiceItem;
