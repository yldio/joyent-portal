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
  PROVISIONING: 'blue',
  RUNNING: 'green',
  STOPPING: 'grey',
  STOPPED: 'grey',
  DELETED: 'secondaryActive',
  FAILED: 'red'
};

export default ({ name, state, primary_ip, last, first }) => (
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
          <CardLabel>{primary_ip}</CardLabel>
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
