const React = require('react');
const ReactRouter = require('react-router-dom');

const Section = require('./section');
const Services = require('@containers/services');
const Service = require('@containers/service');

const {
  Switch,
  Route
} = ReactRouter;

module.exports = () => {
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
