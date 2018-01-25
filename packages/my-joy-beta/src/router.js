import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import get from 'lodash.get';

import { PageContainer } from 'joyent-ui-toolkit';

import { Breadcrumb, Menu } from '@containers/navigation';
import Footer from '@components/navigation/footer';
import CreateInstance from '@containers/create-instance';

import {
  List as Instances,
  Summary as InstanceSummary,
  Tags as InstanceTags,
  Metadata as InstanceMetadata,
  Networks as InstanceNetworks,
  Firewall as InstanceFirewall,
  Cns as InstanceCns,
  Snapshots as InstanceSnapshots,
  Resize as InstanceResize,
  UserScript as InstanceUserScript
} from '@containers/instances';

export default () => (
  <BrowserRouter>
    <PageContainer>
      {/* Breadcrumb */}
      <Switch>
        <Route
          path="/instances/~create/:section?"
          exact
          component={Breadcrumb}
        />
        <Route
          path="/instances/~:action/:instance?"
          exact
          component={Breadcrumb}
        />
        <Route path="/instances/:instance?" component={Breadcrumb} />
      </Switch>

      {/* Menu */}
      <Switch>
        <Route path="/instances/~:action/:id?" exact component={Menu} />
        <Route path="/instances/:instance?/:section?" component={Menu} />
      </Switch>

      {/* Instances List */}
      <Switch>
        <Route path="/instances" exact component={Instances} />
      </Switch>

      {/* Instance Sections */}
      <Switch>
        <Route path="/instances/~:action" component={() => null} />
        <Route
          path="/instances/:instance/summary"
          exact
          component={InstanceSummary}
        />
        <Route
          path="/instances/:instance/tags"
          exact
          component={InstanceTags}
        />
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
          path="/instances/:instance/cns-dns"
          exact
          component={InstanceCns}
        />
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

      {/* Actions */}
      <Switch>
        {/* Create Instance */}
        <Route
          path="/instances/~create/"
          exact
          component={() => <Redirect to="/instances/~create/name" />}
        />
        <Route path="/instances/~create/:step" component={CreateInstance} />
        <Route
          path="/instances/~resize/:instance"
          exact
          component={InstanceResize}
        />
        <Route
          path="/instances/:instance/:section?/~resize"
          exact
          component={InstanceResize}
        />
      </Switch>

      <Route path="/" exact component={() => <Redirect to="/instances" />} />
      <Footer />
    </PageContainer>
  </BrowserRouter>
);
