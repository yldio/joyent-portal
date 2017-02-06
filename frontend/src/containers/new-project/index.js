const React = require('react');
const ReactRouter = require('react-router-dom');

const NewProject = require('@containers/new-project/new-project');
const Billing = require('@containers/new-project/billing');
const NewBilling = require('@containers/new-project/new-billing');

const {
  Match
} = ReactRouter;

module.exports = () => {

  return (
    <div>
      <Match
        component={NewProject}
        exactly
        pattern='/:org/new-project'
      />
      <Match
        component={Billing}
        exactly
        pattern='/:org/new-project/billing'
      />
      <Match
        component={NewBilling}
        exactly
        pattern='/:org/new-project/new-billing'
      />
    </div>
  );
};
