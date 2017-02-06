const React = require('react');
const ReactRouter = require('react-router-dom');

const Section = require('./section');
const Services = require('@containers/services');
const Service = require('@containers/service');

const {
  Match
} = ReactRouter;

module.exports = () => {
  const list = (props) => (
    <Section {...props}>
      <Services {...props} />
    </Section>
  );

  return (
    <div>
      <Match
        component={list}
        exactly
        pattern='/:org/projects/:projectId/services'
      />
      <Match
        component={Service}
        pattern='/:org/projects/:projectId/services/:serviceId/:section?'
      />
    </div>
  );
};
