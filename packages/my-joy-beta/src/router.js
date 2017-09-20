import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import get from 'lodash.get';

import { PageContainer } from 'joyent-ui-toolkit';

import { Breadcrumb, Menu } from '@containers/navigation';
import { Header } from '@components/navigation';

import {
  List as Instances,
  Summary as InstanceSummary,
  Tags as InstanceTags,
  Metadata as InstanceMetadata,
  Networks as InstanceNetworks,
  Firewall as InstanceFirewall,
  Snapshots as InstanceSnapshots
} from '@containers/instances';

export default () => (
  <BrowserRouter>
    <PageContainer>
      <Route path="*" component={Header} />

      <Switch>
        <Route path="/instances" exact component={Breadcrumb} />
        <Route path="/instances/:instance" component={Breadcrumb} />
      </Switch>

      <Switch>
        <Route path="/instances" exact component={Menu} />
        <Route path="/instances/:instance/:section" component={Menu} />
      </Switch>

      <Route path="/instances" exact component={Instances} />

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
      <Route
        path="/instances/:instance"
        exact
        component={({ match }) => (
          <Redirect
            to={`/instances/${get(match, 'params.instance')}/summary`}
          />
        )}
      />

      <Route path="/" exact component={() => <Redirect to="/instances" />} />
    </PageContainer>
  </BrowserRouter>
);
