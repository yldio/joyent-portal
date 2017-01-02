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

const OrgSection = ({
  children,
  org = {},
  project = {},
  sections = []
}) => {
  const name = `${org.name} / ${project.name}`;

  const pathname = (props) => (
    `/${props.org}/projects/${props.project}/${props.section}`
  );

  const links = sections.map((name) => ({
    pathname: pathname({
      org: org.id,
      project: project.id,
      section: name
    }),
    name
  }));

  return (
    <Section links={links} name={name}>
      {children}
    </Section>
  );
};

OrgSection.propTypes = {
  children: React.PropTypes.node,
  org: PropTypes.org,
  project: PropTypes.project,
  sections: PropTypes.sections
};

const mapStateToProps = (state, {
  params = {}
}) => ({
  org: orgByIdSelector(params.org)(state),
  project: projectByIdSelector(params.projectId)(state),
  sections: projectSectionsSelector(state)
});

module.exports = connect(
  mapStateToProps
)(OrgSection);
