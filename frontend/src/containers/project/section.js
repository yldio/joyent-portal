import React from 'react';
import { connect } from 'react-redux';
import PropTypes from '@root/prop-types';
import Section from '@components/section';

import {
  orgByIdSelector,
  projectByIdSelector,
  projectSectionsSelector
} from '@state/selectors';

const ProjectSection = ({
  children,
  org = {},
  project = {},
  sections = []
}) => {
  const pathname = (props) => (
    `/${props.org}/projects/${props.project}/${props.section}`
  );

  const navLinks = sections.map((name) => ({
    pathname: pathname({
      org: org.id,
      project: project.id,
      section: name
    }),
    name
  }));

  const nameLinks = [{
    pathname: `/${org.id}`,
    name: org.name
  }, {
    pathname: `/${org.id}/projects/${project.id}`,
    name: project.name
  }];

  return (
    <Section links={navLinks} name={nameLinks}>
      {children}
    </Section>
  );
};

ProjectSection.propTypes = {
  children: React.PropTypes.node,
  org: PropTypes.org,
  project: PropTypes.project,
  sections: PropTypes.sections
};

const mapStateToProps = (state, {
  match = {
    params: {}
  }
}) => ({
  org: orgByIdSelector(match.params.org)(state),
  project: projectByIdSelector(match.params.projectId)(state),
  sections: projectSectionsSelector(state)
});

export default connect(
  mapStateToProps
)(ProjectSection);
