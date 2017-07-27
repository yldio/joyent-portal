import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { InstancesIcon, HealthyIcon, UnhealthyIcon } from 'joyent-ui-toolkit';
import Status from './status';

import {
  Card,
  CardView,
  CardTitle,
  CardSubTitle,
  CardDescription,
  CardGroupView,
  CardOptions,
  CardHeader,
  CardInfo,
  Anchor
} from 'joyent-ui-toolkit';

const StyledCardHeader = styled(CardHeader)`
  position: relative;
`;

const TitleInnerContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const ServiceListItem = ({
  onQuickActionsClick = () => {},
  deploymentGroup = '',
  service = {},
  isChild = false
}) => {
  const isServiceInactive = service.status !== 'ACTIVE';

  const children = service.children
    ? service.children.map(service =>
        <ServiceListItem
          key={service.id}
          deploymentGroup={deploymentGroup}
          service={service}
          isChild
        />
      )
    : null;

  const to = `/deployment-groups/${deploymentGroup}/services/${service.slug}`;

  const title = isChild
    ? <CardTitle>
        {service.name}
      </CardTitle>
    : <CardTitle>
        <TitleInnerContainer>
          <Anchor to={to} disabled={isServiceInactive} secondary>
            {service.name}
          </Anchor>
        </TitleInnerContainer>
      </CardTitle>;

  const subtitle = (
    <CardSubTitle>
      {service.instances.length}{' '}
      {service.instances.length > 1 ? 'instances' : 'instance'}
    </CardSubTitle>
  );

  const handleCardOptionsClick = evt => {
    onQuickActionsClick(evt, service);
  };

  const instancesCount = service.children
    ? service.children.reduce(
        (count, child) => count + child.instances.length,
        0
      )
    : service.instances.length;

  const header = !isChild
    ? <StyledCardHeader>
        {title}
        <CardDescription>
          <CardInfo
            icon={<InstancesIcon />}
            iconPosition="left"
            label={`${instancesCount} ${instancesCount > 1
              ? 'instances'
              : 'instance'}`}
            color={isServiceInactive ? 'disabled' : 'light'}
          />
        </CardDescription>
        <CardOptions onClick={handleCardOptionsClick} />
      </StyledCardHeader>
    : null;

  const healthyInfo = isServiceInactive
    ? null
    : service.instancesHealthy
      ? <CardInfo
          icon={<HealthyIcon />}
          iconPosition="left"
          label="Healthy"
          color="dark"
        />
      : <CardInfo
          icon={<UnhealthyIcon />}
          iconPosition="left"
          label="Unhealthy"
          color="dark"
        />;

  const view = children
    ? <CardGroupView>
        {children}
      </CardGroupView>
    : <CardView>
        {isChild && title}
        {isChild && subtitle}
        <CardDescription>
          <Status service={service} />
          {healthyInfo}
        </CardDescription>
      </CardView>;

  return (
    <Card
      collapsed={service.collapsed}
      disabled={isServiceInactive}
      flat={isChild}
      headed={!isChild}
      key={service.id}
      stacked={isChild && service.instances > 1}
    >
      {header}
      {view}
    </Card>
  );
};

ServiceListItem.propTypes = {
  onQuickActionsClick: PropTypes.func,
  deploymentGroup: PropTypes.string,
  service: PropTypes.object.isRequired // Define better
};

export default ServiceListItem;
