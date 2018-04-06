import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import {
  PageContainer,
  ViewContainer,
  Message,
  MessageDescription,
  MessageTitle,
  Footer
} from 'joyent-ui-toolkit';

import Breadcrumb from '@containers/breadcrumb';
import { Route as ServerError } from '@root/server-error';

import Summary from '@containers/summary';
import List from '@containers/list';
import Create from '@containers/create';

export default () => (
  <PageContainer>
    {/* Breadcrumb */}
    <Switch>
      <Route
        path="/service-groups/~create/:section?"
        exact
        component={Breadcrumb}
      />
      <Route path="/service-groups/:sg?/:section?" component={Breadcrumb} />
    </Switch>

    {/* Containers */}
    <Switch>
      <Route path="/service-groups" exact component={List} />
      <Route path="/service-groups/~create/:step?" exact component={Create} />
      <Route path="/service-groups/:sg/:section?" exact component={Summary} />
    </Switch>

    <Route path="/~server-error" exact component={ServerError} />

    <Route path="/" exact component={() => <Redirect to="/service-groups" />} />

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
