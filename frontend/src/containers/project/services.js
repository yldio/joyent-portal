import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Section from './section';
import Services from '@containers/services';
import Service from '@containers/service';

export default () => {
  const list = (props) => (
    <Section {...props}>
      <Services {...props} />
    </Section>
  );

  return (
    <Switch>
      <Route
        component={list}
        exact
        path='/:org/projects/:projectId/services'
      />
      <Route
        component={Service}
        path='/:org/projects/:projectId/services/:serviceId/:section?'
      />
    </Switch>
  );
};
