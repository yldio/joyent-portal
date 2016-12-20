const React = require('react');
const ReactRedux = require('react-redux');
const ReactRouter = require('react-router');

const Redirect = require('@components/redirect');
const Section = require('@components/section');
const selectors = require('@state/selectors');

const SectionComponents = {
  services: require('./services'),
  instances: require('./instances'),
  people: require('./people'),
  settings: require('./settings'),
  manifest: require('./manifest')
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
  projectSectionsSelector,
  projectByIdSelector
} = selectors;

const Project = ({
  org = {},
  project = {},
  sections = []
}) => {
  const pathname = (props) => (
    `/${props.org}/projects/${props.project}/${props.section}`
  );

  const name = `${org.name} / ${project.name}`;

  const links = sections.map((name) => ({
    pathname: pathname({
      org: org.id,
      project: project.id,
      section: name
    }),
    name
  }));

  const navMatches = sections.map((name) => {
    const pattern = pathname({
      org: org.id,
      project: project.id,
      section: name
    });

    return (
      <Match
        component={SectionComponents[name]}
        key={name}
        pattern={pattern}
      />
    );
  });

  const missPathname = pathname({
    org: org.id,
    project: project.id,
    section: sections[0]
  });

  const missMatch = !sections.length ? null : (
    <Miss component={Redirect(missPathname)} />
  );

  return (
    <Section links={links} name={name}>
      {navMatches}
      {missMatch}
    </Section>
  );
};

Project.propTypes = {
  org: React.PropTypes.shape({
    id: React.PropTypes.string,
    name: React.PropTypes.string
  }),
  project: React.PropTypes.shape({
    id: React.PropTypes.string,
    name: React.PropTypes.string
  }),
  sections: React.PropTypes.arrayOf(
    React.PropTypes.string
  )
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
)(Project);
