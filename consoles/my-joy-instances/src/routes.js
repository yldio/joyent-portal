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
import Create from '@containers/create';

import {
  List as Instances,
  Summary as InstanceSummary,
  Tags as InstanceTags,
  Metadata as InstanceMetadata,
  Networks as InstanceNetworks,
  Firewall as InstanceFirewall,
  Cns as InstanceCns,
  Snapshots as InstanceSnapshots,
  UserScript as InstanceUserScript
} from '@containers/instances';

export default () => (
  <PageContainer>
    {/* Breadcrumb */}
    <Switch>
      <Route path="/instances/~create/:section?" exact component={Breadcrumb} />
      <Route
        path="/instances/~:action/:instance?"
        exact
        component={Breadcrumb}
      />
      <Route path="/instances/:instance?" component={Breadcrumb} />
    </Switch>

    {/* Menu */}
    <Switch>
      <Route path="/~server-error" component={() => null} />
      <Route path="/instances/~:action/:id?" exact component={Menu} />
      <Route path="/instances/:instance?/:section?" component={Menu} />
    </Switch>

    {/* Instances List */}
    <Switch>
      <Route path="/instances" exact component={Instances} />
    </Switch>

    {/* Instance Sections */}
    <Switch>
      <Route path="/instances/~create/:step?" component={Create} />
      <Route
        path="/instances/:instance/summary"
        exact
        component={InstanceSummary}
      />
      <Route path="/instances/:instance/tags" exact component={InstanceTags} />
      <Route
        path="/instances/:instance/metadata"
        exact
        component={InstanceMetadata}
      />
      <Route
        path="/instances/:instance/networks"
        exact
        component={InstanceNetworks}
      />
      <Route
        path="/instances/:instance/firewall"
        exact
        component={InstanceFirewall}
      />
      <Route
        path="/instances/:instance/snapshots"
        exact
        component={InstanceSnapshots}
      />
      <Route path="/instances/:instance/cns" exact component={InstanceCns} />
      <Route
        path="/instances/:instance/user-script"
        exact
        component={InstanceUserScript}
      />
      <Route
        path="/instances/:instance"
        exact
        component={({ match }) => (
          <Redirect
            to={`/instances/${get(match, 'params.instance')}/summary`}
          />
        )}
      />
    </Switch>

    <Route path="/~server-error" exact component={ServerError} />

    <Route path="/" exact component={() => <Redirect to="/instances" />} />

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
