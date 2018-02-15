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
  UserScript as InstanceUserScript
} from '@containers/instances';

export default () => (
  <BrowserRouter>
    <PageContainer>
      {/* Breadcrumb */}
      <Switch>
        <Route path="/~create/:section?" exact component={Breadcrumb} />
        <Route path="/~:action/:instance?" exact component={Breadcrumb} />
        <Route path="/:instance?" component={Breadcrumb} />
      </Switch>

      {/* Menu */}
      <Switch>
        <Route path="/~:action/:id?" exact component={Menu} />
        <Route path="/:instance?/:section?" component={Menu} />
      </Switch>

      {/* Instances List */}
      <Switch>
        <Route path="/" exact component={Instances} />
      </Switch>

      {/* Instance Sections */}
      <Switch>
        <Route path="/~:action" component={() => null} />
        <Route path="/:instance/summary" exact component={InstanceSummary} />
        <Route path="/:instance/tags" exact component={InstanceTags} />
        <Route path="/:instance/metadata" exact component={InstanceMetadata} />
        <Route path="/:instance/networks" exact component={InstanceNetworks} />
        <Route path="/:instance/firewall" exact component={InstanceFirewall} />
        <Route
          path="/:instance/snapshots"
          exact
          component={InstanceSnapshots}
        />
        <Route path="/:instance/cns" exact component={InstanceCns} />
        <Route
          path="/:instance/user-script"
          exact
          component={InstanceUserScript}
        />
        <Route
          path="/:instance"
          exact
          component={({ match }) => (
            <Redirect to={`/${get(match, 'params.instance')}/summary`} />
          )}
        />
      </Switch>

      {/* Actions */}
      <Switch>
        {/* Create Instance */}
        <Route
          path="/~create/"
          exact
          component={({ match, location }) => (
            <Redirect to={`/~create/name${location.search}`} />
          )}
        />
        <Route path="/~create/:step" component={CreateInstance} />
      </Switch>
      <Footer />
    </PageContainer>
  </BrowserRouter>
);
