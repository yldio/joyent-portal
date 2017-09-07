import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import forceArray from 'force-array';
import sortBy from 'lodash.sortby';
import { isNot } from 'styled-is';
import { Col, Row } from 'react-styled-flexboxgrid';
import remcalc from 'remcalc';

import { InstancesIcon, HealthyIcon } from 'joyent-ui-toolkit';
import Status from './status';

import {
  Small,
  MetricGraph,
  Card,
  CardView,
  CardTitle,
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

const GraphsContainer = styled(Row)`
  background: #f6f7fe;
  width: 50%;
  margin: 0;
  flex: 1;
`;

const GraphContainer = styled(Col)`
  position: relative;
  border-left: ${remcalc(1)} solid #d8d8d8;
  padding-top: ${remcalc(20)};
`;

const GraphLeftShaddow = styled.div`
  z-index: 99;
  position: absolute;
  margin-left: ${remcalc(-8)};
  margin-top: ${remcalc(-20)};
  width: ${remcalc(12)};
  height: 100%;
  background-image: linear-gradient(
    to right,
    rgba(213, 216, 231, 0.8),
    rgba(243, 244, 249, 0)
  );
`;

const GraphTitle = Small.extend`
  z-index: 99;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: ${remcalc(20)};
  border-bottom: ${remcalc(1)} solid #d8d8d8;

  font-size: ${remcalc(13)};
  text-align: center;
  color: #494949;
`;

const ChildTitle = styled(CardTitle)`
  padding: 0;
  flex: 0 1 auto;
  align-self: stretch;
`;

const ServiceView = styled(CardView)`
  height: ${remcalc(120)};
`;

const StatusContainer = styled(CardDescription)`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-content: center;
  align-items: stretch;
`;

const HealthInfoContainer = styled.div`
  flex: 0 1 auto;
  align-self: flex-end;
  position: absolute;
  bottom: 0;
`;

const ServiceListItem = ({
  onQuickActionsClick = () => {},
  deploymentGroup = '',
  service,
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

  const childrenItems = children.length
    ? children.map(service => (
        <ServiceListItem
          key={service.id}
          deploymentGroup={deploymentGroup}
          service={service}
          isChild
        />
      ))
    : null;

  const title = isChild ? (
    <ChildTitle>{service.name}</ChildTitle>
  ) : (
    <CardTitle>
      <TitleInnerContainer>
        <StyledAnchor to={to} secondary active={service.instancesActive}>
          {service.name}
        </StyledAnchor>
      </TitleInnerContainer>
    </CardTitle>
  );

  const header = !isChild ? (
    <StyledCardHeader>
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
  ) : null;

  let healthyInfo = null;
  if (service.instancesActive) {
    const { total, healthy } = service.instancesHealthy;
    const iconHealthy = total === healthy ? 'HEALTHY' : 'NOT HEALTHY';
    const icon = <HealthyIcon healthy={iconHealthy} />;
    const label = `${healthy} of ${total} healthy`;

    healthyInfo = (
      <CardInfo icon={icon} iconPosition="left" label={label} color="dark" />
    );
  }

  const graphs =
    !children.length && service.metrics && Object.keys(service.metrics).length
      ? Object.keys(service.metrics).map(key => (
          <GraphContainer xs={4}>
            <GraphLeftShaddow />
            <GraphTitle>{key}</GraphTitle>
            <MetricGraph
              key={key}
              metricsData={service.metrics[key]}
              graphDurationSeconds={90}
            />
          </GraphContainer>
        ))
      : null;

  const metrics = graphs ? <GraphsContainer>{graphs}</GraphsContainer> : null;

  const view = children.length ? (
    <CardGroupView>{childrenItems}</CardGroupView>
  ) : (
    <ServiceView>
      <StatusContainer>
        {isChild && title}
        <Status service={service} />
        <HealthInfoContainer>{healthyInfo}</HealthInfoContainer>
      </StatusContainer>
      {metrics}
    </ServiceView>
  );

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