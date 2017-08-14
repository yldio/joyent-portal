import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import forceArray from 'force-array';
import sortBy from 'lodash.sortby';
import { isNot } from 'styled-is';

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
  justify-content: left;
  align-items: center;
`;

const StyledAnchor = styled(Anchor)`
  ${isNot('active')`
    color: ${props => props.theme.text}
  `};
`;

const ServiceListItem = ({
  onQuickActionsClick = () => {},
  deploymentGroup = '',
  service = {},
  isChild = false
}) => {
  const handleCardOptionsClick = evt => {
    onQuickActionsClick(evt, service);
  };

  const children = sortBy(forceArray(service.children), ['slug']);
  // const isServiceInactive = service.status && service.status !== 'ACTIVE';
  const to = `/deployment-groups/${deploymentGroup}/services/${service.slug}`;

  const instancesCount = children.length
    ? children.reduce((count, child) => count + child.instances.length, 0)
    : service.instances.length;

  const childrenItems = children.map(service =>
    <ServiceListItem
      key={service.id}
      deploymentGroup={deploymentGroup}
      service={service}
      isChild
    />
  );

  const title = isChild
    ? <CardTitle>
        {service.name}
      </CardTitle>
    : <CardTitle>
        <TitleInnerContainer>
          <StyledAnchor to={to} secondary active={service.instancesActive}>
            {service.name}
          </StyledAnchor>
        </TitleInnerContainer>
      </CardTitle>;

  const subtitle = (
    <CardSubTitle>
      {service.instances.length}{' '}
      {service.instances.length > 1 ? 'instances' : 'instance'}
    </CardSubTitle>
  );

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
            color={!service.instancesActive ? 'disabled' : 'light'}
          />
        </CardDescription>
        <CardOptions onClick={handleCardOptionsClick} />
      </StyledCardHeader>
    : null;

  let healthyInfo = null;
  if(service.instancesActive) {
    const { total, healthy } = service.instancesHealthy;
    const iconHealthy = total === healthy ? 'HEALTHY' : 'NOT HEALTHY';
    const icon = <HealthyIcon healthy={iconHealthy} />;
    const label = `${healthy} of ${total} healthy`;

    healthyInfo = (
      <CardInfo
        icon={icon}
        iconPosition='left'
        label={label}
        color='dark'
      />
    )
  }

  const view = childrenItems.length
    ? <CardGroupView>
        {childrenItems}
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
      active={service.instancesActive}
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
