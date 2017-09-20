import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

import { PageContainer } from 'joyent-ui-toolkit';

import { Header } from '@containers/navigation';
import HomeHOC from '@containers/home';
import { NotFound } from '@components/navigation';

export default () => (
  <BrowserRouter>
    <PageContainer>
      <Route path="/" component={Header} />
      <Switch>
        <Route path="/" exact component={HomeHOC} />
        <Route path="/*" component={NotFound} />
      </Switch>
    </PageContainer>
  </BrowserRouter>
);
