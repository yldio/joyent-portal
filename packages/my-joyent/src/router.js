import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

import { Header } from '@containers/navigation';

import HomeHOC from '@containers/home';

import { NotFound } from '@components/navigation';

const Container = styled.div`
  display: flex;
  flex: 1 1 auto;
  position: relative;
  flex-flow: column;
`;

const Router = (
  <BrowserRouter>
    <Container>
      <Route path="/" component={Header} />
      <Switch>
        <Route path="/" exact component={HomeHOC} />
        <Route path="/*" component={NotFound} />
      </Switch>
    </Container>
  </BrowserRouter>
);

export default Router;
