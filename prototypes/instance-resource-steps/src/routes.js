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
      <Route
        path="/instance-resource-steps/~create/:section?"
        exact
        component={Breadcrumb}
      />
      <Route
        path="/instance-resource-steps/~:action/:resource?"
        component={Breadcrumb}
        exact
      />
      <Route
        path="/instance-resource-steps/:resource?"
        component={Breadcrumb}
      />
    </Switch>

    {/* Menu */}
    <Switch>
      <Route path="/~server-error" component={() => null} />
      <Route
        path="/instance-resource-steps/~:action/:id?"
        exact
        component={Menu}
      />
      <Route
        path="/instance-resource-steps/:resource?/:section?"
        component={Menu}
      />
    </Switch>

    <Route path="/instance-resource-steps/~create/:step?" component={Index} />

    <Route
      path="/"
      exact
      component={() => <Redirect to="/instance-resource-steps/~create" />}
    />

    <Route
      path="/instance-resource-steps"
      exact
      component={() => <Redirect to="/instance-resource-steps/~create" />}
    />

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
