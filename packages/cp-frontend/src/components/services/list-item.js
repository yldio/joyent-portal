import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// Import forceArray from 'force-array';

// import ItemMetricGroup from '@components/item-metric-group';
import {
  Card,
  CardView,
  CardMeta,
  CardTitle,
  CardSubTitle,
  CardDescription,
  CardGroupView,
  CardOptions,
  CardHeader,
  // CardInfo,
  Anchor
  // DataCentersIcon,
  // HealthyIcon,
  // InstancesMultipleIcon
} from 'joyent-ui-toolkit';

import { ServicesQuickActions } from '@components/services';

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
  showQuickActions,
  onQuickActionsClick = () => {},
  onQuickActionsBlur = () => {},
  deploymentGroup = '',
  service = {}
}) => {
  const isChild = Boolean(service.parent);

  const children = service.children
    ? service.children.map(service => (
        <ServiceListItem
          key={service.uuid}
          deploymentGroup={deploymentGroup}
          service={service}
        />
      ))
    : null;

  const to = `/deployment-groups/${deploymentGroup}/services/${service.slug}`;

  const title = service.parent
    ? <CardTitle>
        {service.name}
      </CardTitle>
    : <CardTitle>
        <TitleInnerContainer>
          <Anchor secondary to={to}>
            {service.name}
          </Anchor>
        </TitleInnerContainer>
      </CardTitle>;

  const subtitle = <CardSubTitle>{service.instances} instances</CardSubTitle>;

  const handleCardOptionsClick = evt => {
    onQuickActionsClick({ service });
  };

  const handleQuickActionsBlur = evt => {
    onQuickActionsBlur({ show: false });
  };

  const header = isChild
    ? null
    : <StyledCardHeader>
        <CardMeta>
          {title}
          <CardDescription>
            {/* <CardInfo
              icon={<InstancesMultipleIcon />}
              iconPosition="top"
              label={`${service.instances} ${service.instances > 1 ? 'instances' : 'instance'}`}
            /> */}
            {/* <CardInfo
            icon={<DataCentersIcon />}
            label={service.datacenters[0].id}
          /> */}
          </CardDescription>
        </CardMeta>
        <CardOptions onClick={handleCardOptionsClick} />
        <ServicesQuickActions
          position={{ top: '47px', right: '-98px' }}
          service={service}
          show={showQuickActions}
          onBlur={handleQuickActionsBlur}
        />
      </StyledCardHeader>;

  const view = children
    ? <CardGroupView>
        {children}
      </CardGroupView>
    : <CardView>
        <CardMeta>
          {isChild && title}
          {isChild && subtitle}
          <CardDescription>
            {/* <CardInfo icon={<HealthyIcon />} label="Healthy" /> */}
          </CardDescription>
        </CardMeta>
        {/* <ItemMetricGroup
        datasets={service.metrics}
      /> */}
      </CardView>;

  return (
    <Card
      collapsed={service.collapsed}
      flat={isChild}
      headed={!isChild}
      key={service.uuid}
      stacked={isChild && service.instances > 1}
    >
      {header}
      {view}
    </Card>
  );
};

ServiceListItem.propTypes = {
  showQuickActions: PropTypes.bool,
  onQuickActionsClick: PropTypes.func,
  onQuickActionsBlur: PropTypes.func,
  deploymentGroup: PropTypes.string,
  service: PropTypes.object.isRequired // Define better
};

export default ServiceListItem;
