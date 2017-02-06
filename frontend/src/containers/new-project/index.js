const React = require('react');
const ReactRouter = require('react-router-dom');

const NewProject = require('@containers/new-project/new-project');
const Billing = require('@containers/new-project/billing');
const NewBilling = require('@containers/new-project/new-billing');

const {
  Switch,
  Route
} = ReactRouter;

module.exports = () => (
  <Switch>
    <Route
      component={NewProject}
      exact
      path='/:org/new-project'
    />
    <Route
      component={Billing}
      exact
      path='/:org/new-project/billing'
    />
    <Route
      component={NewBilling}
      exact
      path='/:org/new-project/new-billing'
    />
  </Switch>
);
