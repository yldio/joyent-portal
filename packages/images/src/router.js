import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import get from 'lodash.get';

import { PageContainer } from 'joyent-ui-toolkit';
import Breadcrumb from '@containers/breadcrumb';
import Menu from '@containers/menu';
import List from '@containers/list';
import Summary from '@containers/summary';
import Create from '@containers/create';
import Tags from '@containers/tags';

export default () => (
  <BrowserRouter>
    <PageContainer>
      {/* Breadcrumb */}
      <Switch>
        <Route path="/~create" component={Breadcrumb} />
        <Route path="/:image?" component={Breadcrumb} />
      </Switch>
      {/* Menu */}
      <Switch>
        <Route path="/~create" component={() => null} />
        <Route path="/:image/:section?" component={Menu} />
      </Switch>
      {/* Images */}
      <Switch>
        <Route path="/" exact component={List} />
        <Route path="/~create" exact component={Create} />
        <Route path="/:image/summary" exact component={Summary} />
        <Route path="/:image/tags" exact component={Tags} />
        <Route
          path="/:image"
          exact
          component={({ match }) => (
            <Redirect to={`/${get(match, 'params.image')}/summary`} />
          )}
        />
      </Switch>
    </PageContainer>
  </BrowserRouter>
);
