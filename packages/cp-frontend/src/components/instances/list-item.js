import React, { Component } from 'react';
import PropTypes from 'prop-types';
import remcalc from 'remcalc';
import styled from 'styled-components';
import is, { isOr } from 'styled-is';
import titleCase from 'title-case';

import {
  Card,
  CardInfo,
  CardView,
  CardMeta,
  CardTitle,
  CardDescription,
  HealthyIcon,
  Tooltip,
  TooltipLabel,
  P,
  Label,
  typography
} from 'joyent-ui-toolkit';

const STATUSES = [
  'PROVISIONING',
  'READY',
  'ACTIVE',
  'RUNNING',
  'STOPPING',
  'STOPPED',
  'OFFLINE',
  'DELETED',
  'DESTROYED',
  'FAILED',
  'INCOMPLETE',
  'UNKNOWN'
];

const Dot = styled.span`
  margin-right: ${remcalc(6)};
  width: ${remcalc(6)};
  height: ${remcalc(6)};
  border-radius: ${remcalc(3)};
  display: inline-block;

  ${isOr('provisioning', 'ready', 'active', 'running')`
    background-color: ${props => props.theme.green};
  `};

  ${isOr('stopping', 'stopped')`
    background-color: ${props => props.theme.grey};
  `};

  ${isOr('offline', 'destroyed', 'failed')`
    background-color: ${props => props.theme.red};
  `};

  ${isOr('deleted', 'incomplete', 'unknown')`
    background-color: ${props => props.theme.secondaryActive};
  `};
`;

const StyledCard = Card.extend`
  flex-direction: row;

  &:not(:last-child) {
    margin-bottom: 0;
    box-shadow: none;
    border-bottom-width: 0;
  }

  background-color: ${props => props.theme.white};

  ${isOr('stopping', 'stopped', 'offline', 'destroyed', 'failed', 'deleted', 'incomplete', 'unknown')`
    background-color: ${props => props.theme.background};

    & [name="card-options"] > button {
      background-color: ${props => props.theme.background};
    }`
  }
`;

const InstanceCard = ({
  instance = {},
  onOptionsClick = () => null,
  toggleCollapsed = () => null,
  onHealthMouseOver,
  onStatusMouseOver,
  onMouseOut
}) => {

  const statusProps = STATUSES.reduce(
    (acc, name) =>
      Object.assign(acc, {
        [name.toLowerCase()]: name === instance.status
      }),
    {}
  );

  const label = instance.healthy.toLowerCase();
  const icon = <HealthyIcon healthy={instance.healthy} />;

  const handleHealthMouseOver = (evt) => {
    onHealthMouseOver(evt, instance);
  }

  const handleStatusMouseOver = (evt) => {
    onStatusMouseOver(evt, instance);
  }

  const handleMouseOut = (evt) => {
    onMouseOut(evt);
  }

  return (
    <StyledCard collapsed={true} key={instance.uuid} {...statusProps}>
      <CardView>
        <CardTitle>
          {instance.name}
        </CardTitle>
        <CardDescription>
          <div
            onMouseOver={handleHealthMouseOver}
            onMouseOut={handleMouseOut}
          >
            <CardInfo
              icon={icon}
              iconPosition='left'
              label={label}
              color='dark'
            />
          </div>
        </CardDescription>
        <CardDescription>
          <div
            onMouseOver={handleStatusMouseOver}
            onMouseOut={handleMouseOut}
          >
            <Label>
              <Dot {...statusProps} />
              {titleCase(instance.status)}
            </Label>
          </div>
        </CardDescription>
      </CardView>
    </StyledCard>
  )
};

InstanceCard.propTypes = {
  instance: PropTypes.object,
  onOptionsClick: PropTypes.func,
  toggleCollapsed: PropTypes.func,
  onHealthMouseOver: PropTypes.func,
  onStatusMouseOver: PropTypes.func,
  onMouseOut: PropTypes.func
};

export default InstanceCard;
