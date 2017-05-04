import React from 'react';
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch
} from 'react-router-dom';

import { Container } from '../components/layout';
import { ProjectList } from '../containers/projects';
import { ServiceList } from '../containers/services';
import { InstanceList } from '../containers/instances';

const rootRedirect = (p) => (
  <Redirect to='/projects' />
);

const projectRedirect = (p) => (
  <Redirect to={`${p.location.pathname}/services`} />
);

const Router = (
  <BrowserRouter>
    <Container>

      <Route path='/' exact component={rootRedirect} />
      <Route path='/projects' exact component={ProjectList} />

      <Route path='/projects/:project' exact component={projectRedirect} />
      <Route path='/projects/:project/services' exact component={ServiceList} />

      <Route path='/projects/:project/services/:service/instances' exact component={InstanceList} />
      
    </Container>
  </BrowserRouter>
);

export default Router;
