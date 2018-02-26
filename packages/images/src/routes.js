import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import get from 'lodash.get';

import {
  PageContainer,
  ViewContainer,
  Message,
  MessageDescription,
  MessageTitle
} from 'joyent-ui-toolkit';

import Breadcrumb from '@containers/breadcrumb';
import Menu from '@containers/menu';
import List from '@containers/list';
import Summary from '@containers/summary';
import Create from '@containers/create';
import Tags from '@containers/tags';
import Footer from '@components/footer';
import { Route as ServerError } from '@root/server-error';

export default () => (
  <PageContainer>
    {/* Breadcrumb */}
    <Switch>
      <Route path="/~server-error" component={Breadcrumb} />
      <Route path="/~create/:instance/:step?" exact component={Breadcrumb} />
      <Route path="/:image?" component={Breadcrumb} />
    </Switch>

    {/* Menu */}
    <Switch>
      <Route path="/~server-error" component={() => null} />
      <Route path="/:image/:section?" component={Menu} />
      <Route path="/~create/:instance/:step?" component={() => {}} />
    </Switch>

    {/* Images */}
    <Switch>
      <Route path="/~server-error" component={() => null} />
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
        path="/~create/:instance?"
        exact
        component={({ match }) => (
          <Redirect to={`/~create/${match.params.instance}/name`} />
        )}
      />
      <Route path="/~create/:instance/:step" component={Create} />
    </Switch>

    <Route path="/~server-error" component={ServerError} />

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
