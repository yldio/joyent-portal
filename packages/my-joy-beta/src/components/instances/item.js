import React from 'react';
import titleCase from 'title-case';

import {
  Card,
  CardMeta,
  CardAction,
  CardTitle,
  CardLabel,
  CardView,
  Checkbox,
  FormGroup,
  QueryBreakpoints,
  StatusLoader
} from 'joyent-ui-toolkit';

const { SmallOnly, Small } = QueryBreakpoints;

const stateColor = {
  PROVISIONING: 'primary',
  RUNNING: 'green',
  STOPPING: 'grey',
  STOPPED: 'grey',
  DELETED: 'secondaryActive',
  FAILED: 'red'
};

// eslint-disable-next-line camelcase
export default ({ name, state, primary_ip, loading, last, first }) => (
  <Card collapsed flat={!last} topMargin={first} bottomless={!last} gapless>
    <CardView>
      <CardMeta>
        <CardAction>
          <FormGroup name={name} reduxForm>
            <Checkbox />
          </FormGroup>
        </CardAction>
        <CardTitle to={`/instances/${name}`}>{name}</CardTitle>
        {loading && (
          <CardLabel>
            <StatusLoader small />
          </CardLabel>
        )}
        {!loading && (
          <Small>
            <CardLabel>{primary_ip}</CardLabel>
          </Small>
        )}
        {!loading && (
          <Small>
            <CardLabel
              color={stateColor[state]}
              title={`The instance is ${state}`}
            >
              {titleCase(state)}
            </CardLabel>
          </Small>
        )}
        {!loading && (
          <SmallOnly>
            <CardLabel
              color={stateColor[state]}
              title={`The instance is ${state}`}
            />
          </SmallOnly>
        )}
      </CardMeta>
    </CardView>
  </Card>
);
