import React, { Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import get from 'lodash.get';

import {
  PageContainer,
  ViewContainer,
  Message,
  MessageDescription,
  MessageTitle,
  Footer
} from 'joyent-ui-toolkit';

import Breadcrumb from '@containers/breadcrumb';
import Menu from '@containers/menu';
import List from '@containers/list';
import Summary from '@containers/summary';
import Create from '@containers/create';
import Tags from '@containers/tags';
import { Route as ServerError } from '@root/server-error';

const { REACT_APP_DEV = false } = process.env;

export default () => (
  <PageContainer>
    {/* Breadcrumb  */}
    <Switch>
      <Route path="/images/~server-error" component={Breadcrumb} />
      <Route
        path="/images/~create/:instance/:step?"
        exact
        component={Breadcrumb}
      />
      <Route path="/images/:image?" component={Breadcrumb} />
    </Switch>

    {/* Menu  */}
    <Switch>
      <Route path="/images/~server-error" component={() => null} />
      <Route path="/images/:image/:section?" component={Menu} />
      <Route path="/images/~create/:instance/:step?" component={() => {}} />
    </Switch>

    {/* Images  */}
    <Switch>
      {/* <Route path="/images/~server-error" component={() => null} /> */}
      <Route path="/images/" exact component={List} />
      <Route path="/images/:image/summary" exact component={Summary} />
      <Route path="/images/:image/tags" exact component={Tags} />
      <Route
        path="/images/:image"
        exact
        component={({ match }) => (
          <Redirect to={`/images/${get(match, 'params.image')}/summary`} />
        )}
      />
    </Switch>

    {/* Create Image  */}
    <Switch>
      <Route
        path="/images/~create/:instance?"
        exact
        component={({ match }) => (
          <Redirect to={`/images/~create/${match.params.instance}/name`} />
        )}
      />
      <Route path="/images/~create/:instance/:step" component={Create} />
    </Switch>

    <Route path="/images/~server-error" component={ServerError} />

    <Route path="/" exact component={() => <Redirect to="/images" />} />

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
          path="/templates"
          component={({ location }) =>
            window.location.replace(
              `${window.location.protocol}//${window.location.hostname}:3071${
                location.pathname
              }${location.search}`
            )
          }
        />
        <Route
          path="/service-groups"
          component={({ location }) =>
            window.location.replace(
              `${window.location.protocol}//${window.location.hostname}:3072${
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
