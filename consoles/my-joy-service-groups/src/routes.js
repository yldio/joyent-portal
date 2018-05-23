import React, { Fragment } from 'react';
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
import Create, { Success as CreateSuccess } from '@containers/create';
import Edit, { Success as EditSuccess } from '@containers/edit';

const { REACT_APP_DEV = false } = process.env;

export default () => (
  <PageContainer>
    <Switch>
      <Route
        path="/service-groups/~create/:section?"
        component={Breadcrumb}
        exact
      />
      <Route
        path="/service-groups/~create/:sg/success"
        component={Breadcrumb}
        exact
      />
      <Route
        path="/service-groups/~edit/:sg/success"
        component={Breadcrumb}
        exact
      />
      <Route
        path="/service-groups/~edit/:sg/:section?"
        component={Breadcrumb}
        exact
      />
      <Route
        path="/service-groups/:sg?/:section?"
        component={Breadcrumb}
        exact
      />
    </Switch>

    <Switch>
      <Route path="/service-groups" exact component={List} />
      <Route path="/service-groups/~create/:step?" exact component={Create} />
      <Route
        path="/service-groups/~create/:sg/success"
        component={CreateSuccess}
        exact
      />
      <Route
        path="/service-groups/~edit/:sg/success"
        component={EditSuccess}
        exact
      />
      <Route path="/service-groups/~edit/:sg/:step?" component={Edit} exact />
      <Route path="/service-groups/:sg/:section?" exact component={Summary} />
    </Switch>

    <Route path="/~server-error" exact component={ServerError} />

    <Route path="/" exact component={() => <Redirect to="/service-groups" />} />

    {REACT_APP_DEV ? (
      <Fragment>
        <Route
          path="/instances"
          component={({ location }) =>
            window.location.replace(
              `${window.location.protocol}//${window.location.hostname}:3069${
                location.pathname
              }${location.search}`
            )
          }
        />
        <Route
          path="/images"
          component={({ location }) =>
            window.location.replace(
              `${window.location.protocol}//${window.location.hostname}:3070${
                location.pathname
              }${location.search}`
            )
          }
        />
        <Route
          path="/templates"
          component={({ location }) =>
            window.location.replace(
              `${window.location.protocol}//${window.location.hostname}:3071${
                location.pathname
              }${location.search}`
            )
          }
        />
      </Fragment>
    ) : null}

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
