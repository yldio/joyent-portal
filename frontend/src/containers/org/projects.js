const React = require('react');
const ReactRouter = require('react-router');

const Section = require('./section');
const Projects = require('@containers/projects');
const Project = require('@containers/project');

const {
  Match
} = ReactRouter;

module.exports = () => {
  const list = (props) => (
    <Section {...props}>
      <Projects {...props} />
    </Section>
  );

  return (
    <div>
      <Match
        component={list}
        exactly
        pattern='/:org/projects'
      />
      <Match
        component={Project}
        pattern='/:org/projects/:projectId/:section?'
      />
    </div>
  );
};
