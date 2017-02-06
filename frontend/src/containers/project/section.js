const React = require('react');
const ReactRedux = require('react-redux');

const PropTypes = require('@root/prop-types');
const selectors = require('@state/selectors');
const Section = require('@components/section');

const {
  connect
} = ReactRedux;

const {
  orgByIdSelector,
  projectByIdSelector,
  projectSectionsSelector
} = selectors;

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
  match = {}
}) => ({
  org: orgByIdSelector(match.params.org)(state),
  project: projectByIdSelector(match.params.projectId)(state),
  sections: projectSectionsSelector(state)
});

module.exports = connect(
  mapStateToProps
)(ProjectSection);
