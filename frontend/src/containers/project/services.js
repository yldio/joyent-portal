import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Section from './section';
import ServicesTopology from '@containers/services';
import ServicesList from '@containers/services/list';
import Service from '@containers/service';

export default () => {
  const topology = (props) => (
    <Section {...props}>
      <ServicesTopology {...props} />
    </Section>
  );
  
  const list = (props) => (
    <Section {...props}>
      <ServicesList {...props} />
    </Section>
  );

  return (
    <Switch>
      <Route
        component={topology}
        exact
        path='/:org/projects/:projectId/services'
      />
      <Route
        component={list}
        exact
        path='/:org/projects/:projectId/services/list'
      />
      <Route
        component={Service}
        path='/:org/projects/:projectId/services/:serviceId/:section?'
      />
    </Switch>
  );
};
