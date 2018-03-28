import React from 'react';
import emotion from 'preact-emotion';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import remcalc from 'remcalc';
import groupBy from 'lodash.groupby';

import { Grid, Row, Col } from 'preact-emotion-flexboxgrid';
import { Anchor, Popover } from '../components';

const Account = ({ expanded }) =>
  expanded ? (
    <Popover>
      <Anchor href="/navigation/signout">Log Out</Anchor>
    </Popover>
  ) : null;

export default Account;
