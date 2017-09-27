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
  QueryBreakpoints
} from 'joyent-ui-toolkit';

const { SmallOnly, Small } = QueryBreakpoints;

const stateColor = {
  provisioning: 'blue',
  ready: 'blue',
  active: 'green',
  running: 'green',
  stopping: 'grey',
  stopped: 'grey',
  offline: 'red',
  destroyed: 'red',
  failed: 'red',
  deleted: 'secondaryActive',
  incomplete: 'secondaryActive',
  unknown: 'secondaryActive'
};

export default ({ name, state, primaryIp, last, first }) => (
  <Card collapsed flat={!last} topMargin={first} bottomless={!last} gapless>
    <CardView>
      <CardMeta>
        <CardAction>
          <FormGroup name={name} reduxForm>
            <Checkbox />
          </FormGroup>
        </CardAction>
        <CardTitle to={`/instances/${name}`}>{name}</CardTitle>
        <Small>
          <CardLabel>{primaryIp}</CardLabel>
        </Small>
        <Small>
          <CardLabel
            color={stateColor[state]}
            title={`The instance is ${state}`}
          >
            {titleCase(state)}
          </CardLabel>
        </Small>
        <SmallOnly>
          <CardLabel
            color={stateColor[state]}
            title={`The instance is ${state}`}
          />
        </SmallOnly>
      </CardMeta>
    </CardView>
  </Card>
);
