import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import get from 'lodash.get';

import {
  PageContainer,
  ViewContainer,
  Message,
  MessageDescription,
  MessageTitle,
  Footer
} from 'joyent-ui-toolkit';

import { Breadcrumb, Menu } from '@containers/navigation';
import { Route as ServerError } from '@root/server-error';

import Index from '@containers';

export default () => (
  <PageContainer>
    {/* Breadcrumb */}
    <Switch>
      <Route path="/console/~create/:section?" exact component={Breadcrumb} />
      <Route path="/console/~:action/:resource?" component={Breadcrumb} exact />
      <Route path="/console/:resource?" component={Breadcrumb} />
    </Switch>

    {/* Menu */}
    <Switch>
      <Route path="/~server-error" component={() => null} />
      <Route path="/console/~:action/:id?" exact component={Menu} />
      <Route path="/console/:resource?/:section?" component={Menu} />
    </Switch>

    {/* Resource List */}
    <Switch>
      <Route path="/console" exact component={Index} />
    </Switch>

    {/* Instance Sections */}
    <Switch>
      <Route path="/console/~:action" component={() => null} />
      <Route path="/console/:resource/section" exact component={() => null} />
      <Route
        path="/console/:resource"
        exact
        component={({ match }) => (
          <Redirect to={`/console/${get(match, 'params.resource')}/section`} />
        )}
      />
    </Switch>

    {/* Actions */}
    <Switch>
      {/* Create Instance */}
      <Route
        path="/console/~create/"
        exact
        component={({ match, location }) => (
          <Redirect to={`/console/~create${location.search}`} />
        )}
      />
      <Route path="/console/~create/:step" component={() => null} />
    </Switch>

    <Route path="/~server-error" exact component={ServerError} />

    <Route path="/" exact component={() => <Redirect to="/console" />} />

    <noscript>
      <ViewContainer main>
        <Message warning>
          <MessageTitle>Ooops!</MessageTitle>
          <MessageDescription>
            You need to enable JavaScript to run this app.
          </MessageDescription>
        </Message>
      </ViewContainer>
    </noscript>
    <Footer />
  </PageContainer>
);
