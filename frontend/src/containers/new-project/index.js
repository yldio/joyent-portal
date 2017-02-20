import React from 'react';
import { Switch, Route } from 'react-router-dom';

import NewProject from '@containers/new-project/new-project';
import Billing from '@containers/new-project/billing';
import NewBilling from '@containers/new-project/new-billing';

export default () => (
  <Switch>
    <Route
      component={NewProject}
      exact
      path='/:org/new-project'
    />
    <Route
      component={Billing}
      exact
      path='/:org/new-project/billing'
    />
    <Route
      component={NewBilling}
      exact
      path='/:org/new-project/new-billing'
    />
  </Switch>
);
