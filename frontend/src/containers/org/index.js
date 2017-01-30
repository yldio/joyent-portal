const isEmpty = require('lodash.isempty');
const React = require('react');
const ReactRedux = require('react-redux');
const ReactRouter = require('react-router');

const NotFound = require('@containers/not-found');
const PropTypes = require('@root/prop-types');
const Redirect = require('@components/redirect');
const selectors = require('@state/selectors');

const NewProject = require('@containers/new-project');

const SectionComponents = {
  people: require('./people'),
  projects: require('./projects'),
  settings: require('./settings'),
};

const {
  connect
} = ReactRedux;

const {
  Match,
  Miss
} = ReactRouter;

const {
  orgByIdSelector,
  orgSectionsSelector
} = selectors;

const Org = ({
  org = {},
  sections = []
}) => {
  if (isEmpty(org)) {
    return (
      <NotFound />
    );
  }

  const missMatch = !sections.length ? null : (
    <Miss component={Redirect(`/${org.id}/${sections[0]}`)} />
  );

  const navMatches = sections.map((name) => (
    <Match
      component={SectionComponents[name]}
      key={name}
      pattern={`/:org/${name}`}
    />
  ));

  navMatches.push(
    <Match
      component={NewProject}
      key='new-project'
      pattern={'/:org/new-project'}
    />
  );

  return (
    <div>
      {navMatches}
      {missMatch}
    </div>
  );
};

Org.propTypes = {
  org: PropTypes.org,
  sections: PropTypes.sections
};

const mapStateToProps = (state, ownProps) => ({
  org: orgByIdSelector(ownProps.params.org)(state),
  sections: orgSectionsSelector(ownProps.params.org)(state)
});

module.exports = connect(mapStateToProps)(Org);
