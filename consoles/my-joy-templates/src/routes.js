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

import Create, { Success as CreateSuccess } from '@containers/create';
import Duplicate from '@containers/duplicate';
import List from '@containers/list';
import Summary from '@containers/summary';

export default () => (
  <PageContainer>
    {/* Breadcrumb */}
    <Switch>
      <Route
        path="/templates/~create/:sg/success"
        component={Breadcrumb}
        exact
      />
      <Route path="/templates/~create/:section?" component={Breadcrumb} exact />
      <Route
        path="/templates/~duplicate/success/:sg"
        component={Breadcrumb}
        exact
      />
      <Route
        path="/templates/~duplicate/:sg/:section?"
        component={Breadcrumb}
        exact
      />
      <Route path="/templates/:sg?/:section?" component={Breadcrumb} />
    </Switch>

    <Switch>
      <Route path="/templates" component={List} exact />
      <Route
        path="/templates/~create/:template/success"
        component={CreateSuccess}
        exact
      />
      <Route path="/templates/~create/:step?" component={Create} exact />
      <Route
        path="/templates/~duplicate/:template/success"
        component={CreateSuccess}
        exact
      />
      <Route
        path="/templates/~duplicate/:template/:step?"
        component={Duplicate}
        exact
      />
      <Route path="/templates/:template/:section?" component={Summary} exact />
    </Switch>

    <Route path="/~server-error" component={ServerError} exact />

    <Route path="/" component={() => <Redirect to="/templates" />} exact />

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
