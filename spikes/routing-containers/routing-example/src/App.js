import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Route } from 'react-router-dom';

import { default as TmpApp } from './components/app';
import { default as TmpAppHeader } from './components/app-header';
import { default as TmpAppRedirect } from './containers/app-redirect';
import { default as TmpOrgTabs } from './components/org-tabs';
import { default as TmpBreadcrumb } from './components/breadcrumb';
import { default as TmpMenu } from './components/menu';
import { default as TmpProjects } from './components/projects';
import { default as TmpServices } from './components/services';
import { default as TmpServicesList } from './components/services-list';

const router = (
  <BrowserRouter>
    <TmpApp>
      <Route path="/" component={TmpAppHeader}/>
      <Route path="/:org" component={TmpOrgTabs}/>
      <Route path="/:org/projects/:project" component={TmpBreadcrumb}/>
      <Route path="/:org" component={TmpMenu}/>
      <Route path="/:org/projects" exact component={TmpProjects}/>
      <Route path="/:org/projects/:project/services" exact component={TmpServices}/>
      <Route path="/:org/projects/:project/services/list" component={TmpServicesList}/>
    </TmpApp>
  </BrowserRouter>
);

class App extends Component {
  render() {
    return (
      <div className="App">
        {router}
      </div>
    );
  }
}

export default App;
