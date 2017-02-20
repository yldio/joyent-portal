import isEmpty from 'lodash.isempty';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import React from 'react';

import NotFound from '@containers/not-found';
import PropTypes from '@root/prop-types';
import Redirect from '@components/redirect';
import { orgByIdSelector, orgSectionsSelector } from '@state/selectors';
import NewProject from '@containers/new-project';
import PeopleSection from './people';
import SettingsSection from './settings';
import ProjectSection from './projects';

const SectionComponents = {
  people: PeopleSection,
  settings: SettingsSection,
  projects: ProjectSection
};

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
    <Route
      component={Redirect(`/${org.id}/${sections[0]}`)}
      exact
      path={`/${org.id}`}
    />
  );

  const navMatches = sections.map((name) => (
    <Route
      component={SectionComponents[name]}
      key={name}
      path={`/:org/${name}`}
    />
  ));

  navMatches.push(
    <Route
      component={NewProject}
      key='new-project'
      path={'/:org/new-project'}
    />
  );

  return (
    <Switch>
      {missMatch}
      {navMatches}
    </Switch>
  );
};

Org.propTypes = {
  org: PropTypes.org,
  sections: PropTypes.sections
};

const mapStateToProps = (state, ownProps) => ({
  org: orgByIdSelector(ownProps.match.params.org)(state),
  sections: orgSectionsSelector(ownProps.match.params.org)(state)
});

export default connect(
  mapStateToProps
)(Org);
