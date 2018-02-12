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
import Footer from '@components/footer';

export default () => (
  <BrowserRouter>
    <PageContainer>
      {/* Breadcrumb */}
      <Switch>
        <Route path="/~create/:step" exact component={Breadcrumb} />
        <Route path="/:image?" component={Breadcrumb} />
      </Switch>
      {/* Menu */}
      <Switch>
        <Route path="/:image/:section?" component={Menu} />
        <Route path="/~create/:step" component={() => {}} />
      </Switch>
      {/* Images */}
      <Switch>
        <Route path="/" exact component={List} />
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
      {/* Create Image */}
      <Switch>
        <Route
          path="/~create/"
          exact
          component={() => <Redirect to="/~create/name" />}
        />
        <Route path="/~create/:step" component={Create} />
      </Switch>
      <Footer />
    </PageContainer>
  </BrowserRouter>
);
