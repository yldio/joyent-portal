const React = require('react');
const ReactRouter = require('react-router-dom');

const Section = require('./section');
const Projects = require('@containers/projects');
const Project = require('@containers/project');

const {
  Switch,
  Route
} = ReactRouter;

module.exports = () => {
  const list = (props) => (
    <Section {...props}>
      <Projects {...props} />
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
