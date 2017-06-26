import React from 'react';
import PropTypes from 'prop-types';
import remcalc from 'remcalc';
import styled from 'styled-components';
import is from 'styled-is';
import titleCase from 'title-case';

import {
  Card,
  CardView,
  CardMeta,
  CardTitle,
  CardDescription,
  CardOptions,
  typography
} from 'joyent-ui-toolkit';

const STATUSES = [
  'CREATED',
  'RESTARTING',
  'RUNNING',
  'PAUSED',
  'EXITED',
  'DELETED',
  'STOPPED',
  'FAILED'
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

  ${is('created')`
    background-color: ${props => props.theme.primary};
  `};

  ${is('restarting')`
    background-color: yellow;
  `};

  ${is('running')`
    background-color: ${props => props.theme.green};
  `};

  ${is('paused')`
    background-color: ${props => props.theme.text};
  `};

  ${is('exited')`
    background-color: ${props => props.theme.red};
  `};

  ${is('deleted')`
    background-color: ${props => props.theme.secondaryActive};
  `};

  ${is('stopped')`
    background-color: ${props => props.theme.red};
  `};

  ${is('failed')`
    background-color: ${props => props.theme.red};
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
    <CardOptions onClick={onOptionsClick} />
  </StyledCard>;

InstanceCard.propTypes = {
  instance: PropTypes.object,
  onOptionsClick: PropTypes.func,
  toggleCollapsed: PropTypes.func
};

export default InstanceCard;
