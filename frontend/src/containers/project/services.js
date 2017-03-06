import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Section from './section';
import ServicesTopology from '@containers/services/topology';
import ServicesList from '@containers/services/list';
import Services from '@containers/services';
import Service from '@containers/service';

export default () => {
  const topology = (props) => (
    <Section {...props}>
      <Services {...props}>
        <ServicesTopology {...props} />
      </Services>
    </Section>
  );

  const list = (props) => (
    <Section {...props}>
      <Services {...props}>
        <ServicesList {...props} />
      </Services>
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
