import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Section from './section';
import { LayoutContainer } from '@components/layout';
import Projects from '@containers/projects';
import Project from '@containers/project';

export default () => {
  const list = (props) => (
    <Section {...props}>
      <LayoutContainer>
        <Projects {...props} />
      </LayoutContainer>
    </Section>
  );

  return (
    <Switch>
      <Route
        component={list}
        exact
        path='/:org/projects'
      />
      <Route
        component={Project}
        path='/:org/projects/:projectId/:section?'
      />
    </Switch>
  );
};
