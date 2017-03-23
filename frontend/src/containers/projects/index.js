import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Button from '@ui/components/button';
import Column from '@ui/components/column';
import NavLink from '@ui/components/nav-link';
import { orgByIdSelector, projectsByOrgIdSelector } from '@state/selectors';
import EmptyProjects from '@components/empty/projects';
import PropTypes from '@root/prop-types';
import Row from '@ui/components/row';

const Projects = ({
  org = {},
  projects = []
}) => {
  const empty = projects.length ? null : (
    <EmptyProjects />
  );

  const _projects = projects.map((project) => (
    <li key={project.id}>
      <NavLink
        activeClassName='active'
        to={`/${org.id}/projects/${project.id}`}
      >
        {project.name}
      </NavLink>
    </li>
  ));

  return (
    <div>
      {empty}
      <Row>
        <Column xs={12}>
          <Button to={`/${org.id}/new-project`} rr>
            <FormattedMessage id='create-new' />
          </Button>
        </Column>
      </Row>
      <Row>
        <ul name='projects'>
          {_projects}
        </ul>
      </Row>
    </div>
  );
};

Projects.propTypes = {
  org: PropTypes.org,
  projects: React.PropTypes.arrayOf(PropTypes.project)
};

const mapStateToProps = (state, {
  match = {
    params: {}
  }
}) => ({
  org: orgByIdSelector(match.params.org)(state),
  projects: projectsByOrgIdSelector(match.params.org)(state)
});

export default connect(
  mapStateToProps
)(Projects);
