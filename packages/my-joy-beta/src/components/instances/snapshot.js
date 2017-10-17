import React from 'react';
import titleCase from 'title-case';
import moment from 'moment';

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
  QUEUED: 'blue',
  CANCELED: 'grey',
  FAILED: 'red',
  CREATED: 'green'
};

export default ({ name, state, created, loading, last, first }) => (
  <Card collapsed flat={!last} topMargin={first} bottomless={!last} gapless>
    <CardView>
      <CardMeta>
        <CardAction>
          <FormGroup name={name} reduxForm>
            <Checkbox />
          </FormGroup>
        </CardAction>
        <CardTitle>{name}</CardTitle>
        <CardLabel>{moment.unix(created).fromNow()}</CardLabel>
        {loading && (
          <CardLabel>
            <StatusLoader small />
          </CardLabel>
        )}
        {!loading && (
          <Small>
            <CardLabel color={stateColor[state]}>{titleCase(state)}</CardLabel>
          </Small>
        )}
        {!loading && (
          <SmallOnly>
            <CardLabel color={stateColor[state]} />
          </SmallOnly>
        )}
      </CardMeta>
    </CardView>
  </Card>
);
