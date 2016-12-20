const React = require('react');
const ReactIntl = require('react-intl');
const ReactRedux = require('react-redux');
const ReactRouter = require('react-router');

const Button = require('@ui/components/button');
const Column = require('@ui/components/column');
const Row = require('@ui/components/row');
const selectors = require('@state/selectors');

const {
  connect
} = ReactRedux;

const {
  FormattedMessage
} = ReactIntl;

const {
  orgByIdSelector,
  projectsByOrgIdSelector
} = selectors;

const {
  Link
} = ReactRouter;

const Projects = ({
  org = {},
  projects = []
}) => {
  const empty = projects.length ? null : (
    <Row>
      <Column xs={12}>
        <p name='empty'>
          <FormattedMessage id='no-personal-projects' />
        </p>
      </Column>
    </Row>
  );

  const _projects = projects.map((project) => (
    <li key={project.id}>
      <Link activeClassName='active' to={`/${org.id}/projects/${project.id}`}>
        {project.name}
      </Link>
    </li>
  ));

  return (
    <div>
      {empty}
      <Row>
        <Column xs={12}>
          <Button>
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
  org: React.PropTypes.shape({
    id: React.PropTypes.string,
    name: React.PropTypes.string
  }),
  projects: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      id: React.PropTypes.string,
      name: React.PropTypes.string
    })
  )
};

const mapStateToProps = (state, {
  params = {}
}) => ({
  org: orgByIdSelector(params.org)(state),
  projects: projectsByOrgIdSelector(params.org)(state)
});

module.exports = connect(
  mapStateToProps
)(Projects);
