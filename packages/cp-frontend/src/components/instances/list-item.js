import React from 'react';
import PropTypes from 'prop-types';
import remcalc from 'remcalc';
import styled from 'styled-components';
import is, { isOr } from 'styled-is';
import titleCase from 'title-case';

import {
  Card,
  CardView,
  CardMeta,
  CardTitle,
  CardDescription,
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

const Span = styled.span`
  ${typography.fontFamily};
  ${typography.normal};
`;

const Dot = styled.div`
  margin-right: ${remcalc(6)};
  width: ${remcalc(6)};
  height: ${remcalc(6)};
  border-radius: ${remcalc(3)};
  display: inline-block;

  ${isOr('provisioning', 'ready', 'active')`
    background-color: ${props => props.theme.primary};
  `};

  ${is('running')`
    background-color: ${props => props.theme.green};
  `};

  ${is('stopping')`
    background-color: orange;
  `};

  ${is('stopped')`
    background-color: ${props => props.theme.grey};
  `};

  ${isOr('offline', 'destroyed', 'failed')`
    background-color: ${props => props.theme.red};
  `};

  ${isOr('deleted', 'incomplete', 'unknown')`
    background-color: ${props => props.theme.secondaryActive};
  `};
`;

const StatusBadge = ({ status }) => {
  const props = STATUSES.reduce(
    (acc, name) =>
      Object.assign(acc, {
        [name.toLowerCase()]: name === status
      }),
    {}
  );

  return (
    <Span>
      <Dot {...props} />
      {titleCase(status)}
    </Span>
  );
};

const StyledCard = Card.extend`
  flex-direction: row;

  &:not(:last-child) {
    margin-bottom: 0;
    box-shadow: none;
    border-bottom-width: 0;
  }

  &:nth-child(odd) {
    background-color: ${props => props.theme.background};

    & [name="card-options"] > button {
      background-color: ${props => props.theme.background};
    }
  }
`;

const InstanceCard = ({
  instance = {},
  onOptionsClick = () => null,
  toggleCollapsed = () => null
}) =>
  <StyledCard collapsed={true} key={instance.uuid}>
    <CardView>
      <CardMeta onClick={toggleCollapsed}>
        <CardTitle>{instance.name}</CardTitle>
        <CardDescription>
          <StatusBadge status={instance.status} />
        </CardDescription>
      </CardMeta>
    </CardView>
  </StyledCard>;

InstanceCard.propTypes = {
  instance: PropTypes.object,
  onOptionsClick: PropTypes.func,
  toggleCollapsed: PropTypes.func
};

export default InstanceCard;
